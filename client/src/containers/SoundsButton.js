import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PlayArrow as PlayArrowIcon } from '@material-ui/icons';

import { sounds_actions } from '../actions';
const { openSounds } = sounds_actions;

let SoundsButton = (props) => {
  const { classes, openSounds } = props;
  return (
    <IconButton color='inherit' aria-label='toggle sounds' className={classes.button} onClick={openSounds}>
      <PlayArrowIcon />
    </IconButton>
  );
};
const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
  }
});
SoundsButton = connect(null, { openSounds })(SoundsButton);
SoundsButton = withStyles(styles)(SoundsButton);
export default SoundsButton;
