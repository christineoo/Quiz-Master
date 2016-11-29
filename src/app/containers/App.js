import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, FlatButton, LinearProgress, Dialog } from 'material-ui';
import { hashHistory } from 'react-router'
import MainAppBar from '../components/common/MainAppBar';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            showDialogConfirm: false
        }
    }

    handleBackButton = () => {
        if(this.props.location.pathname == '/quiz_mode'){
            this.setState({
                showDialogConfirm: true
            });
        }
        else {
            hashHistory.push('/home');
        }
    };
    handleDeleteCancel = () => {
        this.setState({
            showDialogConfirm: false
        });
    };

    handleQuitConfirm = () => {
        this.setState({
            showDialogConfirm: false
        });
        hashHistory.push('/home');
    };

    render() {
        const { children } = this.props;

        let loadingProgress = this.props.isPending
            ? <LinearProgress style={{position: 'fixed', zIndex: 1, top: '64px'}} mode="indeterminate"/>
            : null;

        const actions = [
            <FlatButton label={'Quit'}
                        primary={true}
                        onTouchTap={this.handleQuitConfirm}
            />,
            <FlatButton label={'Cancel'}
                        secondary={true}
                        onTouchTap={this.handleDeleteCancel}
            />
        ];

        let confirmDialog = this.state.showDialogConfirm
            ? (<Dialog open={this.state.showDialogConfirm}
                        modal={false}
                        title={'Confirm leave quiz mode?'}
                        actions={actions}
                >
                    Please note that your progress will not be saved.
                </Dialog>)
            : null;

        return (
            <MuiThemeProvider>
                <div style={{height: '100%'}}>
                    <MainAppBar onBackButtonClick={this.handleBackButton} pathname={this.props.location.pathname} />
                    {loadingProgress}
                    {children}
                    {confirmDialog}
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