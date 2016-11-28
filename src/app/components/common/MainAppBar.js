import React, {Component, PropTypes} from 'react';
import {AppBar, FlatButton} from 'material-ui';

const MainAppBar = (props) => (
    <AppBar style={{position: 'fixed'}}
            title="Quiz Master"
            iconElementRight={props.pathname !== '/home'
                ? <FlatButton label="back to home" onTouchTap={props.onTitleTouchTap}/>
                : null
            }
            showMenuIconButton={false}
    />
);
export default MainAppBar;