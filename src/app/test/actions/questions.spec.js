import expect from 'expect';
import {requestRemoteAction, receiveQuestions, showValidatedAnswer} from '../../actions/questions';
import {REQUEST_REMOTE_ACTION, RECEIVE_QUESTIONS, SHOW_VALIDATED_ANSWER} from '../../actions/questions';

describe('Question Actions Test', () => {
    it('trigger remote action', () => {
       const actual = requestRemoteAction();
       const expected = {
           type: REQUEST_REMOTE_ACTION
       };
       expect(actual).toEqual(expected)
    });

    it('load questions', () => {
        const questions = {
            1: {
                answer: "26",
                content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
                created_at: "2016-11-23T15:32:47.917Z",
                id: 1,
                updated_at: "2016-11-23T15:32:47.917Z"
            },
            2: {
                answer: "2",
                content: "<p>How many vowels are there in the <code><strong>English</strong></code> alphabet?</p>",
                created_at: "2016-11-23T15:32:47.917Z",
                id: 2,
                updated_at: "2016-11-23T15:32:47.917Z"
            }
        };
        const actual = receiveQuestions(questions);
        const expected = {
            type: RECEIVE_QUESTIONS,
            questions
        };
        expect(actual).toEqual(expected);
    });

    it('should show validated answer', () => {
        const res = {
            result: "ok",
            expected: "26",
            next_question_id: 2
        };
        const actual = showValidatedAnswer(res);
        const expected = {
            type: SHOW_VALIDATED_ANSWER,
            res
        };
        expect(actual).toEqual(expected);
    });
});