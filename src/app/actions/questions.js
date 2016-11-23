import Api from '../api'
import { Schema, arrayOf, normalize } from 'normalizr';

export const REQUEST_REMOTE_ACTION = 'REQUEST_REMOTE_ACTION';
export function requestRemoteAction() {
    return {
        type: REQUEST_REMOTE_ACTION
    };
}

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
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
                const normalized = normalize(json, arrayOf(new Schema('questions')));
                dispatch(receiveQuestions(normalized.entities.questions));
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

export const RECEIVE_START_QUESTION = 'RECEIVE_START_QUESTION';
export function startingQuiz(question){
    return {
        type: RECEIVE_START_QUESTION,
        question
    }
}
export function startQuiz() {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        Api.get('start_quiz')
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
            })
            .then((json) => {
                dispatch(startingQuiz(json))
            })
    }
}

export function submitAnswer(id, inputAnswer) {
    return (dispatch) => {
        dispatch(requestRemoteAction());
        Api.post(`/check_answer/${id}`, {inputAnswer: inputAnswer})
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
            })
            .then((json) => {
                dispatch(nextQuestion(json))
            })
    }

}