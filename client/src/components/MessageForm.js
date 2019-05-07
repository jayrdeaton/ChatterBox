import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fab, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Send as SendIcon
 } from '@material-ui/icons';

class MessageForm extends Component {
  state = { message: '' };
  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { message } = this.state;
    document.getElementById('message').select();
    this.props.onSubmit(message);
  };
  render() {
    const { classes } = this.props;
    const { message } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
            spacing={16}
          >
            <TextField
              id='message'
              label='Message'
              autoFocus
              className={classes.message}
              value={message}
              onChange={this.handleMessageChange}
              variant='outlined'
            />
            <Fab
              color='primary'
              type='submit'
              className={classes.submit}
            >
              <SendIcon />
            </Fab>
          </Grid>
        </form>
      </div>
    );
  };
};
const styles = theme => ({
  message: {
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  voice: {
    margin: theme.spacing.unit
  },
  submit: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  }
});

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired
};

MessageForm = withStyles(styles)(MessageForm);

export default MessageForm;
