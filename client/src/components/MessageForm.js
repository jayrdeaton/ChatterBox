import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fab, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Send as SendIcon
 } from '@material-ui/icons';

class MessageForm extends Component {
  state = { last_message: '', message: '' };
  handleKeyPress = (e) => {
    const { altKey, ctrlKey, shiftKey, charCode } = e;
    if (!altKey && !ctrlKey && !shiftKey && charCode === 13) this.handleSubmit(e);
  };
  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };
  handleSubmit = (e) => {
    if (e) e.preventDefault();
    const message = this.state.message || this.state.last_message;
    this.setState({ last_message: message, message: '' });
    this.props.onSubmit({ message });
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
              multiline
              rowsMax={4}
              onKeyPress={this.handleKeyPress}
              autoComplete={null}
              className={classes.message}
              value={message}
              onChange={this.handleMessageChange}
              variant='outlined'
            />
            <Fab
              color='primary'
              type='submit'
              className={classes.submit}
              size='small'
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
    marginRight: theme.spacing.unit
    // margin: 0
  },
  voice: {
    margin: theme.spacing.unit
  },
  submit: {
    // margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      // height: 15,
      // width: 15
    },
  }
});

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired
};

MessageForm = withStyles(styles)(MessageForm);

export default MessageForm;
