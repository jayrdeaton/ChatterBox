import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

let NotFound = (props) => {
  return (
    <div className={props.classes.root}>
      <Paper className={props.classes.paper}>
        <Typography variant='body1'>
          Page Not Found!
        </Typography>
      </Paper>
    </div>
  );
};
const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});
NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};
NotFound = withStyles(styles)(NotFound)
export default NotFound;
