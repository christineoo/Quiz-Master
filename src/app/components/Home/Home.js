import React, { Component, PropTypes } from 'react'
import { RaisedButton } from 'material-ui';

class Home extends Component {
    static propTypes = {
        onQuizModeClick: PropTypes.func.isRequired,
        onManageQuestionModeClick: PropTypes.func.isRequired
    };

    render() {
        const style = {
            container: {
                display: 'flex',
                flexDirection: 'column'
            },
            button: {
                margin: '12px'
            }
        };

        return (
            <div style={style.container}>
                <RaisedButton style={style.button}
                              label="Manage Questions Mode"
                              primary={true}
                              onTouchTap={this.props.onManageQuestionModeClick}

                />
                <RaisedButton style={style.button}
                              label="Quiz Mode"
                              primary={true}
                              onTouchTap={this.props.onQuizModeClick}
                />
            </div>
        )
    }
}

export default Home;