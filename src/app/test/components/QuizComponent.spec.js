import expect from 'expect';
import jsdom from 'mocha-jsdom'
import React from 'react'
import TestUtils from 'react-addons-test-utils';
import {mount} from 'enzyme';
import {Card, RaisedButton} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Editor,
    EditorState,
    RichUtils,
    createWithContent,
    ContentState
} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import QuizComponent from '../../components/QuizComponent';

describe('Quiz Question Component', () => {
    jsdom();

    const question = {
        id: 1,
        content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
    };
    const props = {
        question: question,
        validatedAnswer: {},
        onQuizFinishClick: expect.createSpy(),
        onNextQuestionClick: expect.createSpy(),
        onSubmitAnswerClick: expect.createSpy()
    };
    let setup = (validatedAnswer) => {
        const muiTheme = getMuiTheme();
        if (validatedAnswer) {
            return mount(<QuizComponent {...props} validatedAnswer={validatedAnswer}/>, {
                context: {muiTheme},
                childContextTypes: {muiTheme: React.PropTypes.object}
            });
        }
        else {
            return mount(<QuizComponent {...props} />, {
                context: {muiTheme},
                childContextTypes: {muiTheme: React.PropTypes.object}
            });
        }
    };
    it('should render one Card Component', () => {
        const wrapper = setup();
        expect(wrapper.find(Card).nodes.length).toEqual(1);
    });

    it('should show question passed in', () => {
        const wrapper = setup();
        const editor = wrapper.find(Editor);
        const actualEditorState = editor.nodes[0].props.editorState;
        let actualRenderedQuestion = stateToHTML(actualEditorState.getCurrentContent());
        expect(actualRenderedQuestion).toEqual(question.content)
    });

    it('should show "Submit" button disable when input answer is empty and enable it when input answer is not empty', () => {
        const wrapper = setup();
        const buttons = wrapper.find(RaisedButton);
        //Disable submit button by default
        expect(buttons.first().node.props.disabled).toEqual(true);
        expect(wrapper.state().inputAnswer).toEqual('');
        wrapper.setState({inputAnswer: 'example answer'});
        //Enable submit button after user input an answer
        expect(buttons.first().node.props.disabled).toEqual(false);
    });

    it('should render "Quiz Finish" button when next question id is null', () => {
        const validatedAnswer = {
            "result": 'error',
            "input_answer": "21",
            "expected": "yes",
            "next_question_id": null
        };
        const wrapper = setup(validatedAnswer);
        const buttons = wrapper.find(RaisedButton);
        expect(buttons.length).toEqual(1);
        expect(buttons.first().node.props.label).toEqual('Quiz Finish')
    });

    it('should render "Next Question" button when next question id is not null', () => {
        const validatedAnswer = {
            "result": 'error',
            "input_answer": "21",
            "expected": "yes",
            "next_question_id": 1
        };
        const wrapper = setup(validatedAnswer);
        const buttons = wrapper.find(RaisedButton);
        expect(buttons.length).toEqual(1);
        expect(buttons.first().node.props.label).toEqual('Next Question')
    });

    it('should have "incorrect" class message when input answer is incorrect', () => {
        const validatedAnswer = {
            "result": 'error',
            "input_answer": "21",
            "expected": "yes",
            "next_question_id": 1
        };
        const wrapper = setup(validatedAnswer);
        expect(wrapper.find('div.validated-answer').hasClass('incorrect')).toEqual(true);
    });

    it('should have "correct" class message when input answer is correct', () => {
        const validatedAnswer = {
            "result": 'ok',
            "input_answer": "yes",
            "expected": "yes",
            "next_question_id": 1
        };
        const wrapper = setup(validatedAnswer);
        expect(wrapper.find('div.validated-answer').hasClass('correct')).toEqual(true);
    });

    it('should trigger "Submit" button click', () => {
        const wrapper = setup();
        // Need to set answer so that Submit button is not disabled
        wrapper.setState({inputAnswer: 'example answer'});
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            wrapper.instance(), 'button'
        );
        TestUtils.Simulate.touchTap(buttons[0]);
        expect(props.onSubmitAnswerClick).toHaveBeenCalled();
    });

    it('should trigger "Quiz Finish" button click', () => {
        const validatedAnswer = {
            "result": 'error',
            "input_answer": "21",
            "expected": "yes",
            "next_question_id": null
        };
        const wrapper = setup(validatedAnswer);
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            wrapper.instance(), 'button'
        );
        TestUtils.Simulate.touchTap(buttons[0]);
        expect(props.onQuizFinishClick).toHaveBeenCalled();
    });

    it('should trigger "Next Question" button click', () => {
        const validatedAnswer = {
            "result": 'error',
            "input_answer": "21",
            "expected": "yes",
            "next_question_id": 1
        };
        const wrapper = setup(validatedAnswer);
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            wrapper.instance(), 'button'
        );
        TestUtils.Simulate.touchTap(buttons[0]);
        expect(props.onNextQuestionClick).toHaveBeenCalled();
    });
});