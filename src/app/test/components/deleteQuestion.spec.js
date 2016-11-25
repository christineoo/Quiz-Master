import expect from 'expect';
import jsdom from 'mocha-jsdom'
import React from 'react'
import TestUtils from 'react-addons-test-utils';
import expectJSX from'expect-jsx';
import DeleteQuestion from '../../components/question/DeleteQuestion';
import { Dialog, FlatButton } from 'material-ui';

expect.extend(expectJSX);
describe('Delete Question Component', () => {
    jsdom();

    it('should render question passed into this component', () => {
        const question = {
            id: 1,
            answer: "26",
            content: "<p>How many letters are there in the <code><strong>English</strong></code> alphabet?</p>",
        };
        function handleDeleteSubmit(){
            return null;
        }
        function handleDeleteDialogClose() {
            return null;
        }
        const renderer = TestUtils.createRenderer();
        renderer.render(<DeleteQuestion selectedQuestion={question}
                                        openDeleteDialog={true}
                                        onSubmitClick={handleDeleteSubmit}
                                        onDeleteDialogClose={handleDeleteDialogClose}
        />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <Dialog
                title="Are you sure you want to delete this question?"
                open={true}
                onRequestClose={handleDeleteDialogClose}
                modal={true}
                actions={[<FlatButton
                    label={'Cancel'}
                    secondary={true}
                    onTouchTap={handleDeleteDialogClose} />,
                    <FlatButton
                    label={'Delete'}
                    primary={true}
                    disabled={false}
                    onTouchTap={handleDeleteSubmit} />]}
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
});