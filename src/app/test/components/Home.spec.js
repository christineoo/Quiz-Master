import expect from 'expect';
import React from 'react'
import TestUtils from 'react-addons-test-utils';
import expectJSX from'expect-jsx';
import {mount, shallow} from 'enzyme';
import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import {RaisedButton} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from '../../components/home/Home';

injectTapEventPlugin();
expect.extend(expectJSX);

describe('Home Component', () => {
    jsdom();

    const handleQuizModeClick = sinon.spy();
    const handleManageQuestionModeClick = sinon.spy();
    let setup = () => {
        const muiTheme = getMuiTheme();

        const props = {
            onQuizModeClick: handleQuizModeClick,
            onManageQuestionModeClick: handleManageQuestionModeClick
        };

        return mount(<Home {...props} />, {
            context: {muiTheme},
            childContextTypes: {muiTheme: React.PropTypes.object}
        });
    };

    it('should render home Manage Questions Mode button and Quiz Mode button', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Home onQuizModeClick={handleQuizModeClick}
                              onManageQuestionModeClick={handleManageQuestionModeClick}/>);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="home-container">
                <RaisedButton
                    className="button"
                    label="Manage Questions Mode"
                    primary={true}
                    onTouchTap={handleManageQuestionModeClick}
                />
                < RaisedButton
                    className="button"
                    label="Quiz Mode"
                    primary={true}
                    onTouchTap={handleQuizModeClick}
                />
            </div>
        );
        expect(actual).toIncludeJSX(expected);
    });

    it('should render buttons with label Manage Questions Mode and Quiz Mode', () => {
        const expectedManageQuestionModeButtonLabel = "Manage Questions Mode";
        const expectedQuizModeButtonLabel = "Quiz Mode";
        const wrapper = setup();
        let buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            wrapper.instance(), 'button'
        );

        const actualManageQuestionModeButton = buttons[0].textContent;
        const actualQuizModeButtonLabel = buttons[1].textContent;

        expect(actualManageQuestionModeButton).toEqual(expectedManageQuestionModeButtonLabel);
        expect(actualQuizModeButtonLabel).toEqual(expectedQuizModeButtonLabel);
    });

    it('should click Manage Questions Mode once', () => {
        const wrapper = setup();
        let buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            wrapper.instance(), 'button'
        );
        TestUtils.Simulate.touchTap(buttons[0]);
        sinon.assert.calledOnce(handleManageQuestionModeClick);
    });

    it('should click Quiz Mode once', () => {
        const wrapper = setup();
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            wrapper.instance(), 'button'
        );
        TestUtils.Simulate.touchTap(buttons[1]);
        sinon.assert.calledOnce(handleQuizModeClick);
    });
});
