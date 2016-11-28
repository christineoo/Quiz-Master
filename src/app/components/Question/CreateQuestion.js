import React, {Component, PropTypes} from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
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
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}
//text editor's code ends

class New extends Component {

    static propTypes = {
        openCreateDialog: PropTypes.bool.isRequired,
        onCreateDialogClose: PropTypes.func.isRequired,
        onSubmitClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            errorMessage: '',
            answer: '',
            content: ''
        };
        this.onChange = (editorState) => {
            let html = stateToHTML(editorState.getCurrentContent());
            this.setState({
                editorState: editorState,
                content: html
            });
        }
        this.focus = () => this.refs.editor.focus();
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    handleClose = () => {
        // reset the states to empty onDialog close
        this.setState({
            editorState: EditorState.createEmpty(),
            answer: '',
            errorMessage: ''
        });
        this.props.onCreateDialogClose()
    };

    handleSubmit = () => {
        this.props.onSubmitClick({ content: this.state.content, answer: this.state.answer });
        this.handleClose();
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
                onTouchTap={this.handleClose} />,
            <FlatButton
                label={'Create'}
                primary={true}
                // Empty Editor defaults to have <p><br></p>, so we need to check and disable button if Editor is empty
                disabled={this.state.content === '' || this.state.content === "<p><br></p>" || this.state.answer === ''}
                onTouchTap={this.handleSubmit} />,
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
                title="Create New Question"
                open={this.props.openCreateDialog}
                onRequestClose={this.handleClose}
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
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
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

export default New;