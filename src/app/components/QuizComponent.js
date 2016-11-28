import React, {Component, PropTypes} from 'react'
import {Card, CardText, CardActions, TextField, RaisedButton, FontIcon} from 'material-ui';
import {stateFromHTML} from 'draft-js-import-html';
import {Editor, EditorState, createWithContent} from 'draft-js';

class QuizComponent extends Component {
    static propTypes = {
        validatedAnswer: PropTypes.object.isRequired,
        question: PropTypes.object.isRequired,
        onQuizFinishClick: PropTypes.func.isRequired,
        onNextQuestionClick: PropTypes.func.isRequired,
        onSubmitAnswerClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            inputAnswer: '',
            errorMessage: ''
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

    renderNextQuestionOrFinishButton = () => {
        const {validatedAnswer} = this.props;
        if (!validatedAnswer.next_question_id) {
            return (<RaisedButton label="Quiz Finish"
                                  secondary={true}
                                  style={{display: 'flex'}}
                                  onTouchTap={this.props.onQuizFinishClick}/>)
        }
        return (<RaisedButton label="Next Question"
                              secondary={true}
                              style={{display: 'flex'}}
                              onTouchTap={this.props.onNextQuestionClick}/>)
    };

    renderValidatedResult = () => {
        const {validatedAnswer} = this.props;

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
                              onTouchTap={() => {
                                  this.props.onSubmitAnswerClick(this.state.inputAnswer)
                              }}/>
            </CardActions>
        )
    };

    render() {
        const {question, validatedAnswer} = this.props;
        let contentState = stateFromHTML(question.content);
        let editorState = EditorState.createWithContent(contentState);
        return (
            <div>
                <Card style={{minWidth: '500px'}}>
                    <CardText>
                        <div className="RichEditor-editor">
                            <Editor
                                editorState={editorState}
                                ref="editor"
                                readOnly={true}
                            />
                            <TextField fullWidth
                                       floatingLabelFixed={true}
                                       value={!validatedAnswer ? this.state.inputAnswer : validatedAnswer.input_answer}
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
            </div>
        )
    }
}

export default QuizComponent;