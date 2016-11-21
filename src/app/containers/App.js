import React, { Component, PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, FlatButton } from 'material-ui';
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
        return (
            <MuiThemeProvider>
                <div style={{height: '100%'}}>
                    <MainAppBar onTitleTouchTap={this.handleTouchTap} pathname={this.props.location.pathname} />
                    {children}
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App