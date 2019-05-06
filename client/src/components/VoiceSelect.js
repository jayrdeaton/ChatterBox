import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { voices } from '../refs';

class VoiceSelect extends Component {
  render() {
    const { classes, language, onChange, value } = this.props;
    const group = voices[language] || [];
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='voice-select'>Voice</InputLabel>
        <Select
          value={value ? value : 0}
          onChange={onChange}
          inputProps={{
            name: 'voice',
            id: 'voice-select'
          }}
        >
          {group.map((voice, index) =>
            <MenuItem key={index} value={index}>{voice}</MenuItem>
          )}
        </Select>
      </FormControl>
    );
  };
};
const styles = theme => ({
  formControl: {
    minWidth: 120,
  }
});
VoiceSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
};
VoiceSelect = withStyles(styles)(VoiceSelect);
export default VoiceSelect;
