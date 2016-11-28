import expect from 'expect';
import jsdom from 'mocha-jsdom'
import React from 'react'
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import { mount } from 'enzyme';
import expectJSX from'expect-jsx';
import QuestionList from '../../components/question/QuestionsList';
import { Card, FlatButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

expect.extend(expectJSX);
describe('Question List Component', () => {
    jsdom();
    const questions = {
        1: {
            id: 1,
            answer: "26",
            content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
            created_at: "2016-11-23T15:32:47.917Z",
            updated_at: "2016-11-23T15:32:47.917Z"
        },
        2: {
            id: 2,
            answer: "2",
            content: "<p>How many vowels are there in the <code><strong>English</strong></code> alphabet?</p>",
            created_at: "2016-11-23T15:32:47.917Z",
            updated_at: "2016-11-23T15:32:47.917Z"
        },
        3: {
            id: 3,
            answer: "Tokyo",
            content: "<p>What is the capital of <code><strong>Japan</strong></code> ?</p>",
            created_at: "2016-11-23T15:32:47.917Z",
            updated_at: "2016-11-23T15:32:47.917Z"
        }
    };
    const props = {
        questions: questions,
        onUpdateQuestionClick: expect.createSpy(),
        onDeleteQuestionClick: expect.createSpy()
    };
    let setup = () => {
        const muiTheme = getMuiTheme();

        return mount(<QuestionList {...props} />, {
            context: {muiTheme},
            childContextTypes: {muiTheme: React.PropTypes.object}
        });
    };

    it('should render "No questions created yet~!"', () => {
        const questions = {};
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionList questions={questions}
                                      onUpdateQuestionClick={sinon.spy()}
                                      onDeleteQuestionClick={sinon.spy()}
        />);
        const actual = renderer.getRenderOutput();
        const expected = (<div>No questions created yet~!</div>);
        expect(actual).toIncludeJSX(expected);
    });

    it('should render list of cards to show questions', () => {
        const wrapper = setup();
        expect(wrapper.find(Card).nodes.length).toEqual(3);
    });

    it('should trigger Edit button click', () => {
        const wrapper = setup();
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            wrapper.instance(), 'button'
        );
        TestUtils.Simulate.touchTap(buttons[0]);
        expect(props.onUpdateQuestionClick).toHaveBeenCalled();

    });

    it('should trigger Delete button click', () => {
        const wrapper = setup();
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            wrapper.instance(), 'button'
        );
        TestUtils.Simulate.touchTap(buttons[1]);
        expect(props.onDeleteQuestionClick).toHaveBeenCalled();

    })
});
