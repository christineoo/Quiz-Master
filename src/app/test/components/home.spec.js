import expect from 'expect';
import React from 'react'
import TestUtils from 'react-addons-test-utils';
import expectJSX from'expect-jsx';
import Home from '../../components/home/Home';
import { RaisedButton } from 'material-ui';

expect.extend(expectJSX);
describe('HomeComponent', () => {
    function handleQuizMode() {
        return null;
    }

    function handleManageQuestionsMode() {
        return null;
    }

    it('should render home Manage Questions Mode button and Quiz Mode button', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Home onQuizModeClick={handleQuizMode} onManageQuestionModeClick={handleManageQuestionsMode} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="container">
                <RaisedButton
                    className="button"
                    label="Manage Questions Mode"
                    primary={true}
                    onTouchTap={handleManageQuestionsMode}
                />
                < RaisedButton
                    className="button"
                    label = "Quiz Mode"
                    primary = {true}
                    onTouchTap={handleQuizMode}
                />
            </div>
        );
        expect(actual).toIncludeJSX(expected);
    });
});
