import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Settings as SettingsIcon } from '@material-ui/icons';

import { settings_actions } from '../actions';
const { openSettings } = settings_actions;

let SettingsButton = (props) => {
  const { classes, openSettings } = props;
  return (
    <IconButton color='inherit' aria-label='toggle settings' className={classes.button} onClick={openSettings}>
      <SettingsIcon />
    </IconButton>
  );
};
const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
  }
});
SettingsButton = connect(null, { openSettings })(SettingsButton);
SettingsButton = withStyles(styles)(SettingsButton);
export default SettingsButton;
