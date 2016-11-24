import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CenteredView from '../components/common/CenteredView';
import {Card, CardText, CardActions, TextField, RaisedButton, FontIcon} from 'material-ui';

import {stateFromHTML} from 'draft-js-import-html';
import {Editor, EditorState, createWithContent} from 'draft-js';
import { hashHistory } from 'react-router'
import {startQuiz, submitAnswer,getNextQuestion} from '../actions/questions';

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

    componentWillReceiveProps(nextProps) {
        if (this.props.question != nextProps.question) {
            // let contentState = stateFromHTML(nextProps.selectedQuestion.content);
            // this.setState({
            //     content: nextProps.selectedQuestion.content,
            //     answer: nextProps.selectedQuestion.answer,
            //     editorState: EditorState.createWithContent(contentState)
            // });
        }
    }

    onAnswerChange = (event) => {
        this.setState({
            inputAnswer: event.target.value,
            errorMessage: ''
        });

        if (!event.target.value) {
            this.setState({
                errorMessage: 'This field is required.'
            })
        }
    };

    handleSubmitAnswer = () => {
        this.props.submitAnswer(this.props.question.id, this.state.inputAnswer)
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

    renderNextQuestionOrFinishButton = () => {
        const { validatedAnswer } = this.props;
        if(!validatedAnswer.next_question_id){
            return (<RaisedButton label="Quiz Finish"
                                  secondary={true}
                                  style={{margin: '10px 100px'}}
                                  onTouchTap={this.handleFinishQuiz}/>)
        }
        return (<RaisedButton label="Next Question"
                              secondary={true}
                              style={{alignSelf: 'flex-end', margin: '10px 100px'}}
                              onTouchTap={this.handleNextQuestion}/>)
    };

    renderValidatedResult = () => {
        const { validatedAnswer } = this.props;

        if (validatedAnswer.result === 'error') {
            return (
                <div className="validated-answer incorrect">
                    <FontIcon className="material-icons" color='#F56134'>clear</FontIcon>
                    {`Your answer is incorrect. Correct answer is ${validatedAnswer.expected}.`}
                </div>
            )
        }
        else {
            return (
                <div className="validated-answer correct">
                    <FontIcon className="material-icons" color='#58AD3F'>done</FontIcon>
                    Your answer is correct.
                </div>
            )
        }
    };

    renderCardAction = () => {
        return (
            <CardActions>
                <RaisedButton label="Submit"
                              secondary={true}
                              disabled={this.state.inputAnswer === ''}
                              onTouchTap={this.handleSubmitAnswer}/>
            </CardActions>
        )
    };

    render() {
        const { isPending, question, validatedAnswer } = this.props
        console.log('question: ', question)
        console.log('validatedAnswer: ', validatedAnswer)
        if (Object.keys(question).length == 0) {
            return (<CenteredView>No questions created yet~!</CenteredView>)
        }
        // else if (!isPending && Object.keys(question).length > 0) {
        else {
            let contentState = stateFromHTML(question.content);
            let editorState = EditorState.createWithContent(contentState);
            return (
                <div>
                    <CenteredView>
                        <Card style={{ minWidth: '500px' }}>
                            <CardText>
                                <div className="RichEditor-editor">
                                    <Editor
                                        editorState={editorState}
                                        ref="editor"
                                        readOnly={true}
                                    />
                                    <TextField fullWidth
                                               value={this.state.inputAnswer}
                                               floatingLabelText={'Answer'}
                                               onChange={this.onAnswerChange}
                                               errorText={this.state.errorMessage}
                                    />
                                </div>
                                {Object.keys(validatedAnswer).length > 0
                                    ? this.renderValidatedResult()
                                    : this.renderCardAction()
                                }
                            </CardText>
                        </Card>
                        {Object.keys(validatedAnswer).length > 0 ? this.renderNextQuestionOrFinishButton() : null}
                    </CenteredView>
                </div>
            )
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