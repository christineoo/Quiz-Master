import React from 'react'
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store'
import './styles/main.scss';
import 'normalize.css';

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
)
