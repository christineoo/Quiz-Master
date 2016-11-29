import Api from '../api'
import { Schema, arrayOf, normalize } from 'normalizr';

export const REQUEST_REMOTE_ACTION = 'REQUEST_REMOTE_ACTION';
export function requestRemoteAction() {
    return {
        type: REQUEST_REMOTE_ACTION
    };
}

export const REQUEST_QUIZ_QUESTION = 'REQUEST_QUIZ_QUESTION';
export function requestQuizQuestion() {
    return {
        type: REQUEST_QUIZ_QUESTION
    }
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

export const SHOW_VALIDATED_ANSWER = 'SHOW_VALIDATED_ANSWER';
export function showValidatedAnswer(res){
    return {
        type: SHOW_VALIDATED_ANSWER,
        res
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

export const RECEIVE_QUIZ_QUESTION = 'RECEIVE_QUIZ_QUESTION';
export function quizQuestionReceived(question) {
    return {
        type: RECEIVE_QUIZ_QUESTION,
        question
    }
}

export function startQuiz() {
    return (dispatch) => {
        dispatch(requestQuizQuestion());
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
        dispatch(requestQuizQuestion());
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