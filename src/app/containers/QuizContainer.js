import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CenteredView from '../components/common/CenteredView';
import {Card, CardText, CardActions, TextField, RaisedButton, FontIcon} from 'material-ui';

import {stateFromHTML} from 'draft-js-import-html';
import {Editor, EditorState, createWithContent} from 'draft-js';
import { hashHistory } from 'react-router'
import {startQuiz, submitAnswer,getNextQuestion} from '../actions/questions';
import QuizComponent from '../components/QuizComponent';

class QuizContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputAnswer: '',
            errorMessage: ''
        }
    }

    componentWillMount() {
        this.props.startQuiz();
    }

    handleSubmitAnswer = (inputAnswer) => {
        this.props.submitAnswer(this.props.question.id, inputAnswer)
    };

    handleFinishQuiz = () => {
        hashHistory.push('/home');
    };

    handleNextQuestion = () => {
        const { validatedAnswer } = this.props;
        this.props.nextQuestion(validatedAnswer.next_question_id);
        this.setState({
            inputAnswer: ''
        })
    };

    render() {
        const { isPending, question, validatedAnswer } = this.props
        console.log('question: ', question)
        console.log('validatedAnswer: ', validatedAnswer)
        if(isPending) {
            return (<div></div>)
        }
        else if (Object.keys(question).length == 0) {
            return (<CenteredView>No questions created yet~!</CenteredView>)
        }
        // else if (!isPending && Object.keys(question).length > 0) {
        else {
            let contentState = stateFromHTML(question.content);
            let editorState = EditorState.createWithContent(contentState);
            return (
                <div>
                    <CenteredView>
                        <QuizComponent validatedAnswer={validatedAnswer}
                                       question={question}
                                       onQuizFinishClick={this.handleFinishQuiz}
                                       onNextQuestionClick={this.handleNextQuestion}
                                       onSubmitAnswerClick={this.handleSubmitAnswer}/>
                    </CenteredView>
                </div>
            );
        }
    }
}

const stateToProps = state => {
    const {isPending, question, validatedAnswer} = state.questions;

    return {
        isPending,
        question,
        validatedAnswer
    }
};

const actionsToProps = dispatch => ({
    startQuiz: () => dispatch(startQuiz()),
    submitAnswer: (id, answer) => dispatch(submitAnswer(id, answer)),
    nextQuestion: (id) => dispatch(getNextQuestion(id))
});

export default connect(stateToProps, actionsToProps)(QuizContainer);