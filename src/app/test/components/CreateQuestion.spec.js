import expect from 'expect';
import jsdom from 'mocha-jsdom'
import React from 'react'
import sinon from 'sinon';
import {mount} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import expectJSX from'expect-jsx';
import {Dialog, FlatButton, TextField} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Editor,
    EditorState,
    RichUtils,
    createWithContent,
    ContentState
} from 'draft-js';
import CreateQuestion from '../../components/question/CreateQuestion';
import BlockStyleControls from '../../components/common/Editor/BlockStyleControls';
import InlineStyleControls from '../../components/common/Editor/InlineStyleControls';

expect.extend(expectJSX);
describe('Create Question Component', () => {
    jsdom();
    const props = {
        openCreateDialog: false,
        onCreateDialogClose: sinon.spy(),
        onSubmitClick: sinon.spy()
    };

    let setup = () => {
        const muiTheme = getMuiTheme();

        return mount(<CreateQuestion {...props} />, {
            context: {muiTheme},
            childContextTypes: {muiTheme: React.PropTypes.object}
        });
    };

    it('should render create question dialog', () => {
        const editorState = EditorState.createEmpty();
        const renderer = TestUtils.createRenderer();
        renderer.render(<CreateQuestion openCreateDialog={true}
                                        onCreateDialogClose={sinon.spy()}
                                        onSubmitClick={sinon.spy()}
        />);
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
        const actual = renderer.getRenderOutput();
        const expected = (
            <Dialog
                title="Create New Question"
                open={true}
                onRequestClose={sinon.spy()}
                modal={true}
                actions={[
                    <FlatButton
                        label={'Cancel'}
                        secondary={true}
                        onTouchTap={sinon.spy()}/>,
                    <FlatButton
                        label={'Create'}
                        primary={true}
                        disabled={true}
                        onTouchTap={sinon.spy()}/>,
                ]}
                autoScrollBodyContent={true}
            >
                <div className="RichEditor-root">
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={sinon.spy()}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={sinon.spy()}
                    />
                    <div className="RichEditor-editor" onClick={sinon.spy()}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={sinon.spy()}
                            onChange={sinon.spy()}
                            placeholder="Enter Question Content..."
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                    <TextField fullWidth
                               value={""}
                               floatingLabelText={'Answer'}
                               onChange={sinon.spy()}
                               errorText={""}
                    />
                </div>
            </Dialog>
        );
        expect(actual).toIncludeJSX(expected);
    });

    it('should render buttons with label Create and Cancel', () => {
        const expectedCreateLabel = "Create";
        const expectedCancelLabel = "Cancel";
        const wrapper = setup();
        let buttons = wrapper.find(Dialog).node.props.actions;

        const actualCancelButtonLabel = buttons[0].props.label;
        const actualCreateButtonLabel = buttons[1].props.label;

        expect(actualCancelButtonLabel).toEqual(expectedCancelLabel);
        expect(actualCreateButtonLabel).toEqual(expectedCreateLabel);
    });

    it('should disable create button when state.content and state.answer is empty', () => {
        const wrapper = setup();
        expect(wrapper.state().content).toEqual('');
        expect(wrapper.state().answer).toEqual('');
        // Check if Create button is disable by default
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(true);
    });

    it('should enable create button when state.content and state.answer is not empty', () => {
        const wrapper = setup();
        expect(wrapper.state().content).toEqual('');
        expect(wrapper.state().answer).toEqual('');
        // Check if Create button is disable by default
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(true);
        wrapper.setState({content: 'bar', answer: 'foo'});
        wrapper.update();
        expect(wrapper.state().content).toEqual('bar');
        expect(wrapper.state().answer).toEqual('foo');
        // Check if Create button is enabled after setState
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(false);
    });

    it('should disable create button when state.content OR state.answer is empty', () => {
        const wrapper = setup();
        expect(wrapper.state().content).toEqual('');
        expect(wrapper.state().answer).toEqual('');
        // Check if Create button is disable by default
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(true);
        wrapper.setState({content: 'bar'});
        wrapper.update();
        expect(wrapper.state().content).toEqual('bar');
        // Check if Create button still remains disabled after setState
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(true);

        // set content to be empty and answer to 'foo'
        wrapper.setState({content: '', answer: 'foo'});
        wrapper.update();
        expect(wrapper.state().answer).toEqual('foo');
        // Check if Create button still remains disabled after setState
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(true);
    });
});