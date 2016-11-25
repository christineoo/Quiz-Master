import expect from 'expect';
import jsdom from 'mocha-jsdom'
import React from 'react'
import TestUtils from 'react-addons-test-utils';
import expectJSX from'expect-jsx';
import QuestionList from '../../components/question/QuestionsList';

expect.extend(expectJSX);
describe('Question List Component', () => {
    jsdom();

    function handleUpdateQuestionClick() {
        return null;
    }

    function handleDeleteQuestionClick() {
        return null;
    }

    it('should render "No questions created yet~!"', () => {
        const questions = [];
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionList questions={questions}
                                      onUpdateQuestionClick={handleUpdateQuestionClick}
                                      onDeleteQuestionClick={handleDeleteQuestionClick}
        />);
        const actual = renderer.getRenderOutput();
        const expected = (<div>No questions created yet~!</div>);
        expect(actual).toIncludeJSX(expected);
    });

    it('should render list of cards to show questions', () => {
        const questions = [{
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
        }];
        const renderer = TestUtils.createRenderer();
        renderer.render(<QuestionList questions={questions}
                                      onUpdateQuestionClick={handleUpdateQuestionClick}
                                      onDeleteQuestionClick={handleDeleteQuestionClick}
        />);
        const actual = renderer.getRenderOutput().props.children[1][0].length;
        const expected = 3;
        expect(actual).toEqual(expected);
    });
});
