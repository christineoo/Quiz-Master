import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';
import questions from './questions';

const rootReducer = combineReducers({
    routing,
    questions
});

export default rootReducer;