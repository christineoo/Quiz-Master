import expect from 'expect';
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils';
import {mount, shallow} from 'enzyme';
import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import {FlatButton, AppBar} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MainAppBar from '../../components/common/MainAppBar';

describe('MainAppBar Component', () => {
    jsdom();

    const props = {
        pathname: '/quiz_mode',
        onBackButtonClick: expect.createSpy()
    };
    const muiTheme = getMuiTheme();

    let setup = () => {

        return mount(<MainAppBar {...props} />, {
            context: {muiTheme},
            childContextTypes: {muiTheme: React.PropTypes.object}
        });
    };

    it('should render App Bar with the title Quiz Master', () => {
        const wrapper = setup();
        expect(wrapper.find(AppBar).nodes.length).toEqual(1);
        expect(wrapper.find(AppBar).nodes[0].props.title).toEqual('Quiz Master');
    });

    it('should render App Bar with the "Back to Home" Button', () => {
        const wrapper = setup();
        expect(wrapper.find(FlatButton).nodes.length).toEqual(1);
        expect(wrapper.find(FlatButton).nodes[0].props.label).toEqual('back to home');
    });

    it('should not render menu icon', () => {
        const wrapper = setup();
        expect(wrapper.find(AppBar).nodes[0].props.showMenuIconButton).toEqual(false);
    });
});