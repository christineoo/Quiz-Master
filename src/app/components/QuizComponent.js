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

    componentWillReceiveProps(nextProps) {
        if (this.props.question != nextProps.question) {
            this.setState({
                inputAnswer: '',
                errorMessage: ''
            })
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
            return (<CardActions>
                <RaisedButton label="Quiz Finish"
                              secondary={true}
                              onTouchTap={this.props.onQuizFinishClick}/>)
            </CardActions>)
        }
        return (<CardActions>
            <RaisedButton label="Next Question"
                          secondary={true}
                          onTouchTap={this.props.onNextQuestionClick}/>)

        </CardActions>)
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
        const cardStyle = {
            margin: '10px 0',
            maxWidth: '800px',
            minWidth: '400px'
        };
        return (
            <div>
                <Card style={cardStyle}>
                    <CardText>
                        <div className="RichEditor-editor">
                            <Editor
                                editorState={editorState}
                                ref="editor"
                                readOnly={true}
                            />
                            <TextField fullWidth
                                       floatingLabelFixed={true}
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
                        {Object.keys(validatedAnswer).length > 0 ? this.renderNextQuestionOrFinishButton() : null}
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default QuizComponent;