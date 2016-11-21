import {
    REQUEST_REMOTE_ACTION, RECEIVE_QUESTIONS
} from '../actions/questions'

const initState = {
    isPending: false,
    questions: []
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

        default:
            return state;
    }
};

export default questions;
