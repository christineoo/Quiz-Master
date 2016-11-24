import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, FlatButton, LinearProgress } from 'material-ui';
import { hashHistory } from 'react-router'

const MainAppBar = (props) => (
    <AppBar style={{position: 'fixed'}}
        title="Quiz Master"
        iconElementRight={props.pathname !== '/home'
                        ? <FlatButton label="back to home" onTouchTap={props.onTitleTouchTap} />
                        : null
        }
        showMenuIconButton={false}
    />
);

MainAppBar.propTypes = {
    onTitleTouchTap: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
};

class App extends Component {
    handleTouchTap = () => {
        hashHistory.push('/home');
    };

    render() {
        const { children } = this.props;

        let loadingProgress = this.props.isPending
            ? <LinearProgress style={{position: 'fixed', zIndex: 1, top: '64px'}} mode="indeterminate"/>
            : null;

        return (
            <MuiThemeProvider>
                <div style={{height: '100%'}}>
                    <MainAppBar onTitleTouchTap={this.handleTouchTap} pathname={this.props.location.pathname} />
                    {loadingProgress}
                    {children}
                </div>
            </MuiThemeProvider>
        )
    }
}

const stateToProps = state => {
    const {isPending} = state.questions;

    return {
        isPending
    }
};

export default connect(stateToProps)(App);