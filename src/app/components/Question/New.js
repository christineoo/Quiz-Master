import React, {Component, PropTypes} from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

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

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'Unordered List', style: 'unordered-list-item'},
    {label: 'Ordered List', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
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
        this.onChange = (editorState) => this.setState({editorState});
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
        // let rawdata = convertToRaw(this.state.editorState.getCurrentContent())
        let html = stateToHTML(this.state.editorState.getCurrentContent());

        this.setState({
            content: html
        });
        this.props.onSubmitClick({ content: html, answer: this.state.answer });
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
        console.log(this.state.answer)
        const actions = [
            <FlatButton
                label={'Cancel'}
                secondary={true}
                onTouchTap={this.handleClose} />,
            <FlatButton
                label={'Create'}
                primary={true}
                disabled={this.state.content == '' && this.state.answer == ''}
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