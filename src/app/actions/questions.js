import Api from '../api'
import * as types from '../constants/ActionTypes';
import { Schema, arrayOf, normalize } from 'normalizr';

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

export function loadQuestions() {
    return (dispatch) => {
        dispatch(requestRemoteAction());

        Api.get('questions')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((json) => {
                if (json.length > 0) {
                    const normalized = normalize(json, arrayOf(new Schema('questions')));
                    dispatch(receiveQuestions(normalized.entities.questions));
                }
                else {
                    dispatch(receiveQuestions({}));
                }
            })
    }
}

export function createQuestion(newQuestion) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        Api.post('questions', newQuestion)
            .then(res => {
                if(res.ok) {
                    dispatch(loadQuestions())
                }
            })
    }
}

export function updateQuestion(updatedQuestion) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        Api.put(`questions/${updatedQuestion.id}`, updatedQuestion)
            .then(res => {
                if(res.ok) {
                    dispatch(loadQuestions())
                }
            })
    }
}

export function deleteQuestion(id) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        console.log('delete question id: ', id);
        Api.delete(`questions/${id}`)
            .then(res => {
                if(res.ok) {
                    dispatch(loadQuestions())
                }
            })
    }
}

export function submitAnswer(id, inputAnswer) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        Api.post(`check_answer/${id}`, {inputAnswer: inputAnswer})
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
            })
            .then((json) => {
                dispatch(showValidatedAnswer(json))
            })
    }
}

export function startQuiz() {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        dispatch(resetQuizQuestionAndAnswer());
        Api.get('start_quiz')
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
            })
            .then((json) => {
                dispatch(quizQuestionReceived(json))
            })
    }
}

export function getNextQuestion(id) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        dispatch(resetQuizQuestionAndAnswer());
        Api.get(`questions/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((json) => {
                dispatch(quizQuestionReceived(json))
            })
    }
}