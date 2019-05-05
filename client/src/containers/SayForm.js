import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const DOMAIN = process.env.REACT_APP_SAYPI_DOMAIN || '';

class SayForm extends Component {
  state = { message: '' };
  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { message } = this.state;
    try {
      await fetch(`${DOMAIN}/api/say`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ message })
      });
    } catch(err) {
      console.log(err);
    };
  };
  render() {
    const { classes } = this.props;
    const { message } = this.state;
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
