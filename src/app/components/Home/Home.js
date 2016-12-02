import React, {Component, PropTypes} from 'react'
import {RaisedButton} from 'material-ui';

class Home extends Component {
    static propTypes = {
        onQuizModeClick: PropTypes.func.isRequired,
        onManageQuestionModeClick: PropTypes.func.isRequired
    };

    render() {

        return (
            <div className="home-container">
                <RaisedButton className="button"
                              label="Manage Questions Mode"
                              primary={true}
                              onTouchTap={this.props.onManageQuestionModeClick}

                />
                <RaisedButton className="button"
                              label="Quiz Mode"
                              primary={true}
                              onTouchTap={this.props.onQuizModeClick}
                />
            </div>
        )
    }
}

export default Home;