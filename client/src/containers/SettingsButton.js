import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';

import { settings_actions } from '../actions';
const { openSettings } = settings_actions;

let SettingsButton = (props) => {
  const { openSettings } = props;
  return (
    <IconButton color='inherit' onClick={openSettings}>
      <SettingsIcon />
    </IconButton>
  );
};

SettingsButton = connect(null, { openSettings })(SettingsButton);
export default SettingsButton;
