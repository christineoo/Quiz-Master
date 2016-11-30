import * as types from '../constants/ActionTypes';
import { Schema, arrayOf, normalize } from 'normalizr';
import axios from 'axios';

const API_ROOT = "https://quiz-master-test.herokuapp.com/api/v1";

export function requestRemoteAction() {
    return {
        type: types.REQUEST_REMOTE_ACTION
    };
}

export function resetQuizQuestionAndAnswer() {
    return {
        type: types.RESET_QUIZ_QUESTION_AND_ANSWER
    }
}

export function receiveQuestions(questions){
    return {
        type: types.RECEIVE_QUESTIONS,
        questions
    }
}

export function showValidatedAnswer(res){
    return {
        type: types.SHOW_VALIDATED_ANSWER,
        res
    }
}

export function quizQuestionReceived(question) {
    return {
        type: types.RECEIVE_QUIZ_QUESTION,
        question
    }
}

export function receiveError(errorMessage) {
    return {
        type: types.RECEIVE_ERROR_MESSAGE,
        errorMessage
    }
}

export function loadQuestions() {
    return (dispatch) => {
        dispatch(requestRemoteAction());

        return axios.get(`${API_ROOT}/questions`)
            .then((response) => {
                const normalized = normalize(response.data, arrayOf(new Schema('questions')));
                dispatch(receiveQuestions(normalized.entities.questions));
            })
            .catch((error) => {
                dispatch(receiveError(error.message));
            });
    }
}

export function createQuestion(newQuestion) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        return axios.post(`${API_ROOT}/questions`, newQuestion)
            .then((response) => {
                dispatch(loadQuestions())
            })
            .catch((error) => {
                dispatch(receiveError(error.message));
            });
    }
}

export function updateQuestion(updatedQuestion) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        return axios.put(`${API_ROOT}/questions/${updatedQuestion.id}`, updatedQuestion)
            .then((response) => {
                dispatch(loadQuestions())
            })
            .catch((error) => {
                dispatch(receiveError(error.message));
            });
    }
}

export function deleteQuestion(id) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        return axios.delete(`${API_ROOT}/questions/${id}`)
            .then(() => {
                dispatch(loadQuestions())
            })
            .catch((error) => {
                dispatch(receiveError(error.message));
            });
    }
}

export function submitAnswer(id, inputAnswer) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        return axios.post(`${API_ROOT}/check_answer/${id}`, {inputAnswer: inputAnswer})
            .then((response) => {
                dispatch(showValidatedAnswer(response.data))
            })
            .catch((error) => {
                dispatch(receiveError(error.message));
            });
    }
}

export function startQuiz() {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        dispatch(resetQuizQuestionAndAnswer());
        return axios.get(`${API_ROOT}/start_quiz`)
            .then((response) => {
                dispatch(quizQuestionReceived(response.data))
            })
            .catch((error) => {
                dispatch(receiveError(error.message));
            });
    }
}

export function getNextQuestion(id) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        dispatch(resetQuizQuestionAndAnswer());
        return axios.get(`${API_ROOT}/questions/${id}`)
            .then((response) => {
                dispatch(quizQuestionReceived(response.data))
            })
            .catch((error) => {
                dispatch(receiveError(error.message));
            });
    }
}