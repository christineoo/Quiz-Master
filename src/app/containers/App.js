import React, { Component, PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

const AppBarExampleIcon = () => (
    <AppBar
        title="Quiz Master"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
);

class App extends Component {
    render() {
        const { children } = this.props
        return (
            <div>
                <MuiThemeProvider>
                <AppBarExampleIcon />
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App