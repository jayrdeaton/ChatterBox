import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fab, Grid, IconButton, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Settings as SettingsIcon,
  Send as SendIcon
 } from '@material-ui/icons';

import SettingsDialog from './SettingsDialog';

class SayForm extends Component {
  state = { language: 'English', message: '', name: '', settings_open: false, speed: 1, voice: 'Alex' };
  componentWillReceiveProps(props) {
    const { message, voice } = props;
    if (message !== this.state.message || voice !== this.state.voice) this.setState({ message, voice });
  };
  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };
  handleVoiceChange = (e) => {
    this.setState({ voice: e.target.value })
  };
  handleSettingsClick = () => {
    this.setState({ settings_open: true });
  };
  handleSettingsSubmit = (settings) => {
    if (!settings) return this.setState({ settings_open: false });
    const { language, name, speed, voice } = settings;
    this.setState({ language, name, settings_open: false, speed, voice });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { message, name, speed, voice } = this.state;
    document.getElementById('message').select();
    this.props.onSubmit({ message, name, speed, voice });
  };
  render() {
    const { classes } = this.props;
    const { language, message, name, speed, voice } = this.state;
    return (
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
        <IconButton onClick={this.handleSettingsClick}>
          <SettingsIcon />
        </IconButton>
          <Fab
            color='primary'
            type='submit'
            className={classes.submit}
          >
            <SendIcon />
          </Fab>
        </Grid>
        <SettingsDialog open={this.state.settings_open} onSubmit={this.handleSettingsSubmit} language={language} name={name} speed={speed} voice={voice} />
      </form>
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
    margin: theme.spacing.unit
  }
});

SayForm.propTypes = {
  classes: PropTypes.object.isRequired
};

SayForm = withStyles(styles)(SayForm);

export default SayForm;
