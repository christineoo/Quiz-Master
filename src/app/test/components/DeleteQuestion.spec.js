import expect from 'expect';
import jsdom from 'mocha-jsdom'
import React from 'react'
import sinon from 'sinon';
import { mount } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import expectJSX from'expect-jsx';
import DeleteQuestion from '../../components/question/DeleteQuestion';
import { Dialog, FlatButton } from 'material-ui';
import { RaisedButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

expect.extend(expectJSX);
describe('Delete Question Component', () => {
    jsdom();

    const handleOnDeleteDialogClose = sinon.spy();
    const handleOnSubmitClick = sinon.spy();
    const question = {
        id: 1,
        answer: "26",
        content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
    };
    let setup = () => {
        const muiTheme = getMuiTheme();

        const props = {
            selectedQuestion: question,
            openDeleteDialog: false,
            onDeleteDialogClose: handleOnDeleteDialogClose,
            onSubmitClick: handleOnSubmitClick
        };

        return mount(<DeleteQuestion {...props} />, {
            context: {muiTheme},
            childContextTypes: {muiTheme: React.PropTypes.object}
        });
    };

    it('should render question passed into Delete Question component', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<DeleteQuestion selectedQuestion={question}
                                        openDeleteDialog={true}
                                        onSubmitClick={sinon.spy()}
                                        onDeleteDialogClose={sinon.spy()}
        />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <Dialog
                title="Are you sure you want to delete this question?"
                open={true}
                onRequestClose={handleOnDeleteDialogClose}
                modal={true}
                actions={[<FlatButton
                    label={'Cancel'}
                    secondary={true}
                    onTouchTap={handleOnDeleteDialogClose} />,
                    <FlatButton
                    label={'Delete'}
                    primary={true}
                    disabled={false}
                    onTouchTap={handleOnSubmitClick} />]}
                autoScrollBodyContent={true}
            >
                <p>Question: </p>
                <p dangerouslySetInnerHTML={{__html: question.content}} />
                <p>Answer: </p>
                <p>{question.answer}</p>
            </Dialog>
        );
        expect(actual).toIncludeJSX(expected);
    });

    it('should render buttons with label Delete and Cancel', () => {
        const expectedDeleteLabel = "Delete";
        const expectedCancelLabel = "Cancel";
        const wrapper = setup();
        let buttons = wrapper.find(Dialog).node.props.actions;

        const actualCancelButtonLabel = buttons[0].props.label;
        const actualDeleteButtonLabel = buttons[1].props.label;

        expect(actualCancelButtonLabel).toEqual(expectedCancelLabel);
        expect(actualDeleteButtonLabel).toEqual(expectedDeleteLabel);
    });
});