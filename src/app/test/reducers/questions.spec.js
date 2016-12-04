import expect from 'expect';
import questionReducer from '../../reducers/questions';
import {
    REQUEST_REMOTE_ACTION,
    RECEIVE_QUESTIONS,
    RECEIVE_QUIZ_QUESTION,
    SHOW_VALIDATED_ANSWER,
    RESET_QUIZ_QUESTION_AND_ANSWER,
    RECEIVE_ERROR_MESSAGE
} from '../../constants/ActionTypes';

describe('Questions Reducer Test', () => {
    function initState() {
        return {
            isPending: false,
            questionsById: {},
            question: {},
            validatedAnswer: {},
            errorMessage: '',
            error: false
        }
    }

    const questionsById = {
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
        }
    };
    it('should return initial state', () => {
        const action = {};
        const actual = questionReducer(undefined, action);
        const expected = {
            isPending: false,
            questionsById: {},
            question: {},
            validatedAnswer: {},
            errorMessage: '',
            error: false
        };
        expect(actual).toEqual(expected)
    });

    it('should return questions by ids', () => {
        const action = {
            type: RECEIVE_QUESTIONS,
            questions: questionsById
        };
        const actual = questionReducer(initState(), action);
        const expected = {
            isPending: false,
            questionsById: questionsById,
            question: {},
            validatedAnswer: {},
            errorMessage: '',
            error: false
        };
        expect(actual).toEqual(expected)
    });

    it('should return pending true for remote actions', () => {
        const action = {
            type: REQUEST_REMOTE_ACTION
        };
        const actual = questionReducer(initState(), action);
        const expected = {
            isPending: true,
            questionsById: {},
            question: {},
            validatedAnswer: {},
            errorMessage: '',
            error: false
        };
        expect(actual).toEqual(expected)
    });

    it('should reset quiz question and validated answer', () => {
        const action = {
            type: RESET_QUIZ_QUESTION_AND_ANSWER
        };

        function beforeState() {
            return {
                isPending: false,
                questionsById: questionsById,
                question: questionsById[1],
                validatedAnswer: {
                    result: "ok",
                    expected: "26",
                    next_question_id: 2
                },
                errorMessage: '',
                error: false
            }
        }

        const actual = questionReducer(beforeState(), action);
        const expected = {
            isPending: false,
            questionsById: questionsById,
            question: {},
            validatedAnswer: {},
            errorMessage: '',
            error: false
        };
        expect(actual).toEqual(expected)
    });

    it('should assign question received to question', () => {
        const action = {
            type: RECEIVE_QUIZ_QUESTION,
            question: {
                id: 1,
                content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
            }

        };
        const actual = questionReducer(initState(), action);
        const expected = {
            isPending: false,
            questionsById: {},
            question: {
                id: 1,
                content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
            },
            validatedAnswer: {},
            errorMessage: '',
            error: false
        };
        expect(actual).toEqual(expected)
    });

    it('should assign validated answer received to validatedAnswer', () => {
        const question = {
            id: 1,
            content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
        };

        function beforeState() {
            return {
                isPending: false,
                questionsById: {},
                question: question,
                validatedAnswer: {},
                errorMessage: '',
                error: false
            }
        }

        const action = {
            type: SHOW_VALIDATED_ANSWER,
            res: {
                result: "ok",
                expected: "26",
                next_question_id: 2
            }

        };
        const actual = questionReducer(beforeState(), action);
        const expected = {
            isPending: false,
            questionsById: {},
            question: question,
            validatedAnswer: {
                result: "ok",
                expected: "26",
                next_question_id: 2
            },
            errorMessage: '',
            error: false
        };
        expect(actual).toEqual(expected)
    });

    it('should assign receive error message and set error to true', () => {
        const action = {
            type: RECEIVE_ERROR_MESSAGE,
            errorMessage: 'Network Error'
        };
        const expected = {
            isPending: false,
            questionsById: {},
            question: {},
            validatedAnswer: {},
            errorMessage: 'Network Error',
            error: true
        };
        const actual = questionReducer(initState(), action);
        expect(actual).toEqual(expected)

    })
});