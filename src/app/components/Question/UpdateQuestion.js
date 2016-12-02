import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField} from 'material-ui';
import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';
import {
    Editor,
    EditorState,
    RichUtils,
    createWithContent,
    ContentState
} from 'draft-js';
import BlockStyleControls from '../common/Editor/BlockStyleControls';
import InlineStyleControls from '../common/Editor/InlineStyleControls';

//text editor's code starts
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}
//text editor's code ends

class Edit extends Component {

    static propTypes = {
        selectedQuestion: PropTypes.object.isRequired,
        openUpdateDialog: PropTypes.bool.isRequired,
        onUpdateDialogClose: PropTypes.func.isRequired,
        onUpdateClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        let contentState = stateFromHTML(this.props.selectedQuestion.content);
        this.state = {
            content: this.props.selectedQuestion.content,
            answer: this.props.selectedQuestion.answer,
            editorState: EditorState.createWithContent(contentState),
            errorMessage: ''
        };

        this.onChange = (editorState) => {
            let html = stateToHTML(editorState.getCurrentContent());
            this.setState({
                editorState: editorState,
                content: html
            });
        };
        this.focus = () => this.refs.editor.focus();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedQuestion != nextProps.selectedQuestion) {
            let contentState = stateFromHTML(nextProps.selectedQuestion.content);
            this.setState({
                content: nextProps.selectedQuestion.content,
                answer: nextProps.selectedQuestion.answer,
                editorState: EditorState.createWithContent(contentState)
            });
        }
    }

    handleKeyCommand = (command) => {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    };

    toggleBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    };

    toggleInlineStyle = (inlineStyle) => {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    };

    handleCancel = () => {
        // reset the states to original state onDialog cancel
        let contentState = stateFromHTML(this.props.selectedQuestion.content);

        this.setState({
            editorState: EditorState.createWithContent(contentState),
            answer: this.props.selectedQuestion.answer,
            errorMessage: ''
        });
        this.props.onUpdateDialogClose()
    };

    handleUpdate = () => {
        this.setState({
            errorMessage: ''
        });
        this.props.onUpdateClick({
            id: this.props.selectedQuestion.id,
            content: this.state.content,
            answer: this.state.answer
        });
    };

    onAnswerChange = (event) => {
        this.setState({
            answer: event.target.value,
            errorMessage: ''
        });

        if (!event.target.value) {
            this.setState({
                errorMessage: 'This field is required.'
            })
        }
    };

    render() {
        const actions = [
            <FlatButton
                label={'Cancel'}
                secondary={true}
                onTouchTap={this.handleCancel}/>,
            <FlatButton
                label={'Update'}
                primary={true}
                // Empty Editor defaults to have <p><br></p>, so we need to check and disable button if Editor is empty
                disabled={this.state.content === '' || this.state.content === "<p><br></p>" || this.state.answer === ''}
                onTouchTap={this.handleUpdate}/>
        ];

        const {editorState} = this.state;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        return (
            <Dialog
                title="Edit Question"
                open={this.props.openUpdateDialog}
                onRequestClose={this.props.onUpdateDialogClose}
                modal={true}
                actions={actions}
                autoScrollBodyContent={true}
            >
                <div className="RichEditor-root">
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <div className={className} onClick={this.focus}>
                        <Editor
                            //blockStyleFn={getBlockStyle}
                            //customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            placeholder="Enter Question Content..."
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                    <TextField fullWidth
                               value={this.state.answer}
                               floatingLabelText={'Answer'}
                               onChange={this.onAnswerChange}
                               errorText={this.state.errorMessage}
                    />
                </div>
            </Dialog>
        )
    }
}

export default Edit;