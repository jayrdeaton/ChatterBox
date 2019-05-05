import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { VoiceSelect } from '../components';

const DOMAIN = process.env.REACT_APP_SAYPI_DOMAIN || '';

class SayForm extends Component {
  state = { message: '' };
  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };
  handleVoiceChange = (e) => {
    this.setState({ voice: e.target.value })
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { message, voice } = this.state;
    try {
      await fetch(`${DOMAIN}/api/say`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ message, voice })
      });
    } catch(err) {
      console.log(err);
    };
  };
  render() {
    const { classes } = this.props;
    const { message, voice } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id='message'
          label='Message'
          className={classes.textField}
          value={message}
          onChange={this.handleMessageChange}
          variant='outlined'
        />
        <VoiceSelect value={voice} onChange={this.handleVoiceChange} />
        <Button
          variant='contained'
          color='primary'
          type='submit'
        >
          Say It
        </Button>
      </form>
    );
  };
};
const styles = theme => ({

});

SayForm.propTypes = {
  classes: PropTypes.object.isRequired
};

SayForm = withStyles(styles)(SayForm);
export default SayForm;
