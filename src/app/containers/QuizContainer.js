import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CenteredView from '../components/common/CenteredView';
import {Card, CardText, CardActions, TextField, RaisedButton, FontIcon} from 'material-ui';
import {Editor, EditorState, createWithContent} from 'draft-js';
import {hashHistory} from 'react-router'
import {startQuiz, submitAnswer, getNextQuestion} from '../actions/questions';
import QuizComponent from '../components/QuizComponent';

class QuizContainer extends Component {

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
        const {validatedAnswer} = this.props;
        this.props.nextQuestion(validatedAnswer.next_question_id);
    };

    render() {
        const {isPending, question, validatedAnswer, error} = this.props
        console.log('question: ', question)
        console.log('validatedAnswer: ', validatedAnswer)
        if (isPending && Object.keys(question).length == 0 || error) {
            return (<div></div>)
        }
        else if (Object.keys(question).length == 0 && !isPending && !error) {
            return (<CenteredView>No questions created yet~!</CenteredView>)
        }
        else {
            return (
                <div className="container">
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
    const {isPending, question, validatedAnswer, error} = state.questions;

    return {
        isPending,
        question,
        validatedAnswer,
        error
    }
};

const actionsToProps = dispatch => ({
    startQuiz: () => dispatch(startQuiz()),
    submitAnswer: (id, answer) => dispatch(submitAnswer(id, answer)),
    nextQuestion: (id) => dispatch(getNextQuestion(id))
});

export default connect(stateToProps, actionsToProps)(QuizContainer);