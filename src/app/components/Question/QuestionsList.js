import React, {Component, PropTypes} from 'react'
import {Card, CardActions, CardText, RaisedButton, FontIcon} from 'material-ui';
import {stateFromHTML} from 'draft-js-import-html';
import {Editor, EditorState, createWithContent} from 'draft-js';

class QuestionsList extends Component {

    static propTypes = {
        questions: PropTypes.object.isRequired,
        onUpdateQuestionClick: PropTypes.func.isRequired,
        onDeleteQuestionClick: PropTypes.func.isRequired
    };

    render() {
        const {questions} = this.props;
        const QuestionListStyle = {
            // paddingTop: '70px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        };

        if(Object.keys(questions).length !== 0) {
            return (
                <div style={QuestionListStyle}>
                    <h1>Questions List</h1>

                    {Object.keys(questions).map((key) => {
                        const cardStyle = {
                            margin: '10px 0',
                            maxWidth: '400px',
                            minWidth: '400px'

                        };
                        let contentState = stateFromHTML(questions[key].content);
                        let editorState = EditorState.createWithContent(contentState);

                        return (
                            <Card style={cardStyle} key={questions[key].id}>
                                <CardText>
                                    <div className="RichEditor-editor">
                                        <Editor
                                            editorState={editorState}
                                            ref="editor"
                                            readOnly={true}
                                        />
                                        <p>{`Answer: ${questions[key].answer}`}</p>
                                    </div>
                                </CardText>
                                <CardActions>
                                    <RaisedButton label="Edit"
                                                  secondary={true}
                                                  icon={<FontIcon className="material-icons">edit</FontIcon>}
                                                  onTouchTap={() => this.props.onUpdateQuestionClick(questions[key])}/>
                                    <RaisedButton label="Delete"
                                                  secondary={true}
                                                  icon={<FontIcon className="material-icons">delete_forever</FontIcon>}
                                                  onTouchTap={() => this.props.onDeleteQuestionClick(questions[key])}/>
                                </CardActions>
                            </Card>
                        )
                    })}

                </div>
            )
        }
        else {
            return (
                <div>No questions created yet~!</div>
            )
        }
    }

}

export default QuestionsList;
