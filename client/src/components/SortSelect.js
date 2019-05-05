import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

class SortSelect extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='sort-select'>Sort</InputLabel>
        <Select
          value={this.props.selection ? this.props.selection : ''}
          onChange={this.props.handleChange}
          inputProps={{
            name: 'sort',
            id: 'sort-select'
          }}
        >
          <MenuItem value={'Newest'}>Newest</MenuItem>
          <MenuItem value={'Oldest'}>Oldest</MenuItem>
          <MenuItem value={'A-Z'}>A-Z</MenuItem>
          <MenuItem value={'Z-A'}>Z-A</MenuItem>
          <MenuItem value={'Increasing Price'}>Increasing Price</MenuItem>
          <MenuItem value={'Decreasing Price'}>Decreasing Price</MenuItem>
        </Select>
      </FormControl>
    );
  };
};
const styles = theme => ({
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
  }
});
SortSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  selection: PropTypes.string
};
SortSelect = withStyles(styles)(SortSelect);
export default SortSelect;
