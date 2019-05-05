import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { voices } from '../refs';

class VoiceSelect extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='voice-select'>Voice</InputLabel>
        <Select
          value={this.props.value ? this.props.value : ''}
          onChange={this.props.onChange}
          inputProps={{
            name: 'voice',
            id: 'voice-select'
          }}
        >
          {voices.english.map((voice, index) =>
            <MenuItem key='index' value={voice}>{voice}</MenuItem>
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
  handleChange: PropTypes.func.isRequired,
  selection: PropTypes.string
};
VoiceSelect = withStyles(styles)(VoiceSelect);
export default VoiceSelect;
