import expect from 'expect';
import jsdom from 'mocha-jsdom'
import React from 'react'
import sinon from 'sinon';
import { mount } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import expectJSX from'expect-jsx';
import { Dialog, FlatButton, TextField } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Editor,
    EditorState,
    RichUtils,
    createWithContent,
    ContentState
} from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import UpdateQuestion from '../../components/question/UpdateQuestion';
import BlockStyleControls from '../../components/common/Editor/BlockStyleControls';
import InlineStyleControls from '../../components/common/Editor/InlineStyleControls';

expect.extend(expectJSX);
describe('Update Question Component', () => {
    jsdom();

    const question = {
        id: 1,
        answer: "26",
        content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
    };
    const props = {
        selectedQuestion: question,
        openUpdateDialog: true,
        onUpdateDialogClose: sinon.spy(),
        onUpdateClick: sinon.spy()
    };
    let setup = () => {
        const muiTheme = getMuiTheme();

        return mount(<UpdateQuestion {...props} />, {
            context: {muiTheme},
            childContextTypes: {muiTheme: React.PropTypes.object}
        });
    };
    it('should render question passed into this component', () => {
        const contentState = stateFromHTML(question.content);
        const editorState = EditorState.createWithContent(contentState);
        const renderer = TestUtils.createRenderer();
        renderer.render(<UpdateQuestion openUpdateDialog={true}
                                        onUpdateClick={sinon.spy()}
                                        selectedQuestion={question}
                                        onUpdateDialogClose={sinon.spy()}
        />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <Dialog
                title="Edit Question"
                open={true}
                onRequestClose={sinon.spy()}
                modal={true}
                actions={[
                    <FlatButton
                        label={'Cancel'}
                        secondary={true}
                        onTouchTap={sinon.spy()}/>,
                    <FlatButton
                        label={'Update'}
                        primary={true}
                        disabled={false}
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
                            //blockStyleFn={getBlockStyle}
                            //customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={sinon.spy()}
                            onChange={sinon.spy()}
                            placeholder="Enter Question Content..."
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                    <TextField fullWidth
                               value={question.answer}
                               floatingLabelText={'Answer'}
                               onChange={sinon.spy()}
                               errorText={''}
                    />
                </div>
            </Dialog>
        );
        expect(actual).toIncludeJSX(expected);
    });

    it('should render buttons with label Update and Cancel', () => {
        const expectedUpdateLabel = "Update";
        const expectedCancelLabel = "Cancel";
        const wrapper = setup();
        let buttons = wrapper.find(Dialog).node.props.actions;

        const actualCancelButtonLabel = buttons[0].props.label;
        const actualUpdateButtonLabel = buttons[1].props.label;

        expect(actualCancelButtonLabel).toEqual(expectedCancelLabel);
        expect(actualUpdateButtonLabel).toEqual(expectedUpdateLabel);
    });

    it('should enable Update button if content and answer is not empty', () => {
        const wrapper = setup();
        expect(wrapper.state().content).toEqual(question.content);
        expect(wrapper.state().answer).toEqual(question.answer);
        expect(wrapper.state().errorMessage).toEqual('');
        // Check if Update button is disable by default
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(false);
    });

    it('should disable update button when state.content and state.answer is empty', () => {
        const wrapper = setup();
        // Check if Update button is enable by default
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(false);
        wrapper.setState({ content: '', answer: '' });
        wrapper.update();
        expect(wrapper.state().content).toEqual('');
        expect(wrapper.state().answer).toEqual('');
        // Check if Update button is enabled after setState
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(true);
    });

    it('should disable update button when state.content OR state.answer is empty', () => {
        const wrapper = setup();
        // Check if Update button is enabled by default
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(false);
        wrapper.setState({ answer: '' });
        wrapper.update();
        expect(wrapper.state().answer).toEqual('');
        // Check if Update button still remains disabled after setState
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(true);

        // set content to be empty and answer to question.answer
        wrapper.setState({ content: '', answer: question.answer });
        wrapper.update();
        expect(wrapper.state().answer).toEqual(question.answer);
        // Check if Update button still remains disabled after setState
        expect(wrapper.find(Dialog).node.props.actions[1].props.disabled).toEqual(true);
    });
});