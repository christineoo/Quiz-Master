import React, {Component, PropTypes} from 'react'
import CenteredView from '../components/common/CenteredView'
import Home from '../components/home/Home'
import {hashHistory} from 'react-router'

class HomeContainer extends Component {

    handleQuizModeClick = () => {
        hashHistory.push('/quiz_mode');
        console.log('handleModeClick');
    };

    handleManageQuestionsMode = () => {
        hashHistory.push('/manage_questions_mode');
    };

    render() {
        return (
            <div>
                <CenteredView>
                    <Home
                        onQuizModeClick={this.handleQuizModeClick}
                        onManageQuestionModeClick={this.handleManageQuestionsMode}
                    />
                </CenteredView>
            </div>
        )
    }
}

export default HomeContainer;