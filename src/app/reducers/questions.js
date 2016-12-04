import {
    REQUEST_REMOTE_ACTION,
    RECEIVE_QUESTIONS,
    RECEIVE_QUIZ_QUESTION,
    SHOW_VALIDATED_ANSWER,
    RESET_QUIZ_QUESTION_AND_ANSWER,
    RECEIVE_ERROR_MESSAGE
} from '../constants/ActionTypes'

const initState = {
    isPending: false,
    questionsById: {},
    question: {},
    validatedAnswer: {},
    errorMessage: '',
    error: false
};

const questions = function (state = initState, action = null) {

    switch (action.type) {
        case REQUEST_REMOTE_ACTION:
            return Object.assign({}, state, {
                isPending: true
            });

        case RESET_QUIZ_QUESTION_AND_ANSWER:
            return Object.assign({}, state, {
                question: {},
                validatedAnswer: {}
            });

        case RECEIVE_QUESTIONS:
            return Object.assign({}, state, {
                isPending: false,
                questionsById: action.questions,
                errorMessage: '',
                error: false
            });

        case RECEIVE_QUIZ_QUESTION:
            return Object.assign({}, state, {
                isPending: false,
                question: action.question,
                errorMessage: '',
                error: false
            });

        case SHOW_VALIDATED_ANSWER:
            return Object.assign({}, state, {
                isPending: false,
                validatedAnswer: action.res,
                errorMessage: '',
                error: false
            });

        case RECEIVE_ERROR_MESSAGE:
            return Object.assign({}, state, {
                isPending: false,
                errorMessage: action.errorMessage,
                error: true
            });

        default:
            return state;
    }
};

export default questions;
