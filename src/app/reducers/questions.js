import {
    REQUEST_REMOTE_ACTION, RECEIVE_QUESTIONS, RECEIVE_START_QUESTION
} from '../actions/questions'

const initState = {
    isPending: false,
    questions: [],
    question: {}
};

const questions = function(state = initState, action = null) {

    switch (action.type) {
        case REQUEST_REMOTE_ACTION:
            return Object.assign({}, state, {
                isPending: true
            });

        case RECEIVE_QUESTIONS:
            return Object.assign({}, state, {
                isPending: false,
                questions: [action.questions]
            });

        case RECEIVE_START_QUESTION:
            return Object.assign({}, state, {
                isPending: false,
                question: action.question
            });

        default:
            return state;
    }
};

export default questions;
