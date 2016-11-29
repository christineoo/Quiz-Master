import React, {Component, PropTypes} from 'react';
import {AppBar, FlatButton} from 'material-ui';


const MainAppBar = (props) => (
    <AppBar style={{position: 'fixed'}}
            title="Quiz Master"
            iconElementRight={props.pathname !== '/home'
                ? <FlatButton label="back to home" onTouchTap={props.onBackButtonClick}/>
                : null
            }
            showMenuIconButton={false}
    />
);

MainAppBar.propTypes = {
    onBackButtonClick: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
};

export default MainAppBar;