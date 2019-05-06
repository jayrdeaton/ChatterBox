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

class LanguageSelect extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='language-select'>Language</InputLabel>
        <Select
          value={this.props.value ? this.props.value : ''}
          onChange={this.props.onChange}
          inputProps={{
            name: 'language',
            id: 'language-select'
          }}
        >
          {Object.keys(voices).sort().map((language, index) =>
            <MenuItem key={index} value={language}>{language}</MenuItem>
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
LanguageSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};
LanguageSelect = withStyles(styles)(LanguageSelect);
export default LanguageSelect;
