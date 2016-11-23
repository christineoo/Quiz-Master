import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CenteredView from '../components/common/CenteredView';
import {Card, CardText, CardActions, TextField, FlatButton} from 'material-ui';
import {stateFromHTML} from 'draft-js-import-html';
import {Editor, EditorState, createWithContent} from 'draft-js';
import {startQuiz, submitAnswer} from '../actions/questions';

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

    handleSubmitAnswer = () => {
        this.props.submitAnswer(this.props.question.id, this.state.inputAnswer)
    };

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

    render() {
        const { isPending, question } = this.props
        console.log('question: ', question)
        if (!isPending && Object.keys(question).length > 0) {
            let contentState = stateFromHTML(question.content);
            let editorState = EditorState.createWithContent(contentState);
            return (
                <div>
                    <CenteredView>
                        <Card>
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
                            </CardText>
                            <CardActions>
                                <FlatButton label="Submit" onTouchTap={this.handleSubmitAnswer}/>
                            </CardActions>
                        </Card>
                    </CenteredView>
                </div>
            )
        }
        else if (Object.keys(question).length == 0) {
            return (<CenteredView>No questions created yet~!</CenteredView>)
        }
        else {
            return(<CenteredView>Pending</CenteredView>)
        }
    }
}

const stateToProps = state => {
    const {question, isPending} = state.questions;

    return {
        question,
        isPending
    }
};

const actionsToProps = dispatch => ({
    startQuiz: () => dispatch(startQuiz()),
    submitAnswer: (id, answer) => dispatch(submitAnswer(id, answer))
});

export default connect(stateToProps, actionsToProps)(QuizContainer);