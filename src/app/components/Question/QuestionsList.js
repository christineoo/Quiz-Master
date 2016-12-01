import React, {Component, PropTypes} from 'react'
import {Card, CardActions, CardText, RaisedButton, FontIcon} from 'material-ui';
import {stateFromHTML} from 'draft-js-import-html';
import {Editor, EditorState, createWithContent} from 'draft-js';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Create from 'material-ui/svg-icons/content/create';

class QuestionsList extends Component {

    static propTypes = {
        questions: PropTypes.object.isRequired,
        onUpdateQuestionClick: PropTypes.func.isRequired,
        onDeleteQuestionClick: PropTypes.func.isRequired
    };

    render() {
        const {questions} = this.props;
        const QuestionListStyle = {
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
                            maxWidth: '700px',
                            minWidth: '700px'
                        };
                        let contentState = stateFromHTML(questions[key].content);
                        let editorState = EditorState.createWithContent(contentState);

                        return (
                            <Card style={cardStyle} key={questions[key].id}>
                                <CardText style={{padding: '0px 16px'}}>
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
                                                  icon={<Create />}
                                                  onTouchTap={() => this.props.onUpdateQuestionClick(questions[key])}/>
                                    <RaisedButton label="Delete"
                                                  secondary={true}
                                                  icon={<DeleteForever />}
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
