import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Fab,
  TextField
} from '@material-ui/core';
import {
  Search as SearchIcon
} from '@material-ui/icons';
class SearchInput extends Component {
  render() {
    const { classes, onChange, onSubmit, value } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          className={classes.input}
          id='outlined-full-width'
          label='Search'
          placeholder='What are you looking for?'
          margin='normal'
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <Fab color='primary' className={classes.fab}>
          <SearchIcon />
        </Fab>
      </div>
    );
  };
};
const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    margin: 0,
    minWidth: 200
  },
  fab: {
    marginLeft: theme.spacing.unit
  }
});
SearchInput = withStyles(styles)(SearchInput);
export default SearchInput;
