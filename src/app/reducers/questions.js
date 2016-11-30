import {
    REQUEST_REMOTE_ACTION,
    RECEIVE_QUESTIONS,
    RECEIVE_QUIZ_QUESTION,
    SHOW_VALIDATED_ANSWER,
    RESET_QUIZ_QUESTION_AND_ANSWER
} from '../constants/ActionTypes'

const initState = {
    isPending: false,
    questions: {},
    question: {},
    validatedAnswer: {}
};

const questions = function(state = initState, action = null) {

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
                questions: action.questions
            });

        case RECEIVE_QUIZ_QUESTION:
            return Object.assign({}, state, {
                isPending: false,
                question: action.question,
                validatedAnswer: {}
            });

        case SHOW_VALIDATED_ANSWER:
            return Object.assign({}, state, {
                isPending: false,
                validatedAnswer: action.res
            });

        default:
            return state;
    }
};

export default questions;
