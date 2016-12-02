import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom'
import {shallow} from 'enzyme';

import CenteredView from '../../components/common/CenteredView';

describe('Centered View Component', () => {
    jsdom();
    let addEventListenerSpy;

    beforeEach(() => {
        addEventListenerSpy = sinon.spy(window, 'addEventListener')
    });
    afterEach(() => {
        // Restore the original function.
        window.addEventListener.restore();
    });

    it(`should add a "resize" event listener`, () => {
        const wrapper = shallow(<CenteredView />);
        // call it manually to mount the event listener
        wrapper.instance().componentDidMount();
        expect(addEventListenerSpy.callCount).toEqual(1);
        expect(addEventListenerSpy.args[0][0]).toEqual('resize');
        expect(addEventListenerSpy.args[0][1]).toEqual(wrapper.instance().onResize);
    })

});
