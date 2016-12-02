import expect from 'expect';
import {
    requestRemoteAction,
    resetQuizQuestionAndAnswer,
    receiveQuestions,
    quizQuestionReceived,
    showValidatedAnswer,
    receiveError
} from '../../actions/questions';
import {
    REQUEST_REMOTE_ACTION,
    RESET_QUIZ_QUESTION_AND_ANSWER,
    RECEIVE_QUESTIONS,
    RECEIVE_QUIZ_QUESTION,
    SHOW_VALIDATED_ANSWER,
    RECEIVE_ERROR_MESSAGE
} from '../../constants/ActionTypes';

describe('Question Actions Test', () => {
    it('should trigger remote action', () => {
        const actual = requestRemoteAction();
        const expected = {
            type: REQUEST_REMOTE_ACTION
        };
        expect(actual).toEqual(expected)
    });

    it('should trigger reset quiz and answer', () => {
        const actual = resetQuizQuestionAndAnswer();
        const expected = {
            type: RESET_QUIZ_QUESTION_AND_ANSWER
        };
        expect(actual).toEqual(expected)
    });

    it('should trigger receive questions', () => {
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

    it('should trigger receive quiz question', () => {
        const question = {
            answer: "2",
            content: "<p>How many vowels are there in the <code><strong>English</strong></code> alphabet?</p>",
            created_at: "2016-11-23T15:32:47.917Z",
            id: 2,
            updated_at: "2016-11-23T15:32:47.917Z"
        };
        const actual = quizQuestionReceived(question);
        const expected = {
            type: RECEIVE_QUIZ_QUESTION,
            question
        };
        expect(actual).toEqual(expected);

    });

    it('should trigger show validated answer', () => {
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

    it('should trigger receive error', () => {
        const errorMessage = 'Network Error';
        const actual = receiveError(errorMessage);
        const expected = {
            type: RECEIVE_ERROR_MESSAGE,
            errorMessage
        };
        expect(actual).toEqual(expected);
    });
});