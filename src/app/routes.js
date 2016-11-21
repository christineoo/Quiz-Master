import React from 'react';
import { IndexRedirect, Route } from 'react-router';

import App from './containers/App';
import HomeContainer from './containers/HomeContainer'
import ManageQuestionsContainer from './containers/ManageQuestionsContainer'

import Question from './components/Question/Question'

export default <Route path="/" component={App}>
    <Route path="home" component={HomeContainer} />
    <Route path="quiz_mode" component={Question} />
    <Route path="manage_questions_mode" component={ManageQuestionsContainer} />

    <IndexRedirect to="/home" />
</Route>