import expect from 'expect';
import {
    loadQuestions,
    requestRemoteAction,
    resetQuizQuestionAndAnswer,
    receiveQuestions,
    quizQuestionReceived,
    showValidatedAnswer,
    submitAnswer,
    receiveError,
    startQuiz,
    getNextQuestion
} from '../../actions/questions';
import {
    REQUEST_REMOTE_ACTION,
    RESET_QUIZ_QUESTION_AND_ANSWER,
    RECEIVE_QUESTIONS,
    RECEIVE_QUIZ_QUESTION,
    SHOW_VALIDATED_ANSWER,
    RECEIVE_ERROR_MESSAGE
} from '../../constants/ActionTypes';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockAxios = new MockAdapter(axios);

describe('Question Actions Test', () => {

    const API_ROOT = "https://quiz-master-test.herokuapp.com/api/v1";
    const mockStore = configureStore(middlewares);

    afterEach(() => {
        mockAxios.reset();
    });

    const questions = [
        {
            answer: "26",
            content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
            created_at: "2016-11-23T15:32:47.917Z",
            id: 1,
            updated_at: "2016-11-23T15:32:47.917Z"
        },
        {
            answer: "2",
            content: "<p>How many vowels are there in the <code><strong>English</strong></code> alphabet?</p>",
            created_at: "2016-11-23T15:32:47.917Z",
            id: 2,
            updated_at: "2016-11-23T15:32:47.917Z"
        }
    ];

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

    context('Mock API', () => {
        it('loadQuestions action 200 status dispatches REQUEST_REMOTE_ACTION and RECEIVE_QUESTIONS', () => {
            mockAxios.onGet(`${API_ROOT}/questions`).reply(200, questions);
            const expectedActions = [
                'REQUEST_REMOTE_ACTION',
                'RECEIVE_QUESTIONS'
            ];
            const store = mockStore({questions: {}});
            return store.dispatch(loadQuestions()).then(() => {
                expect(store.getActions().map(action => action.type)).toEqual(expectedActions)
            });
        });

        it('loadQuestions action 400 status dispatches REQUEST_REMOTE_ACTION and RECEIVE_ERROR_MESSAGE', () => {
            mockAxios.onGet(`${API_ROOT}/questions`).reply(400, questions);
            const expectedActions = [
                'REQUEST_REMOTE_ACTION',
                'RECEIVE_ERROR_MESSAGE'
            ];
            const store = mockStore({questions: {}});
            return store.dispatch(loadQuestions()).then(() => {
                expect(store.getActions().map(action => action.type)).toEqual(expectedActions)
            });
        });


        it('submitAnswer action dispatches REQUEST_REMOTE_ACTION and SHOW_VALIDATED_ANSWER', () => {
            const expectedActions = [
                'REQUEST_REMOTE_ACTION',
                'SHOW_VALIDATED_ANSWER'
            ];
            const mockResponse = {
                result: "error",
                expected: "quote",
                next_question_id: 24
            };
            const stubAns = {inputAnswer: 'asdf'};
            mockAxios.onPost(`${API_ROOT}/check_answer/22`, stubAns).reply(200, mockResponse);
            const store = mockStore({questions: {}});
            return store.dispatch(submitAnswer(22, 'asdf')).then(() => {
                const showValidatedAnswer = store.getActions().filter((action) => {
                    return action.type == 'SHOW_VALIDATED_ANSWER'
                });
                expect(showValidatedAnswer[0].res).toEqual(mockResponse);
                expect(store.getActions().map(action => action.type)).toEqual(expectedActions)
            });
        });

        it('startQuiz action dispatches REQUEST_REMOTE_ACTION, RESET_QUIZ_QUESTION_AND_ANSWER and RECEIVE_QUIZ_QUESTION', () => {
            const firstQuestion = {
                content: "This is a question",
            };
            mockAxios.onGet(`${API_ROOT}/start_quiz`).reply(200, firstQuestion);
            const expectedActions = [
                'REQUEST_REMOTE_ACTION',
                'RESET_QUIZ_QUESTION_AND_ANSWER',
                'RECEIVE_QUIZ_QUESTION'
            ];
            const store = mockStore({questions: {}});
            return store.dispatch(startQuiz()).then(() => {
                const receiveQuizQuestion = store.getActions().filter((action) => {
                    return action.type == 'RECEIVE_QUIZ_QUESTION'
                });
                expect(receiveQuizQuestion[0].question).toEqual(firstQuestion);
                expect(store.getActions().map(action => action.type)).toEqual(expectedActions)
            });
        });

        it('getNextQuestion action dispatches REQUEST_REMOTE_ACTION, RESET_QUIZ_QUESTION_AND_ANSWER and RECEIVE_QUIZ_QUESTION', () => {
            const currentQuestionId = 20;
            const nextQuestion = {
                id: 22,
                answer: "quote",
                content: "<blockquote>this is a blockquote</blockquote>↵<p><br></p>",
                created_at: "2016-11-29T17:24:25.860Z",
                updated_at: "2016-11-29T17:24:25.860Z"
            };
            mockAxios.onGet(`${API_ROOT}/questions/${currentQuestionId}`).reply(200, nextQuestion);
            const expectedActions = [
                'REQUEST_REMOTE_ACTION',
                'RESET_QUIZ_QUESTION_AND_ANSWER',
                'RECEIVE_QUIZ_QUESTION'
            ];
            const store = mockStore({questions: {}});
            return store.dispatch(getNextQuestion(currentQuestionId)).then(() => {
                const receiveQuizQuestion = store.getActions().filter((action) => {
                    return action.type == 'RECEIVE_QUIZ_QUESTION'
                });
                expect(receiveQuizQuestion[0].question).toEqual(nextQuestion);
                expect(store.getActions().map(action => action.type)).toEqual(expectedActions)
            });
        });
    });
});