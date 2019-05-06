import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Fab, Grid, IconButton, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Settings as SettingsIcon,
  Send as SendIcon
 } from '@material-ui/icons';
import { SettingsDialog } from '../components';

import { settings_actions } from '../actions';
const { closeSettings, openSettings } = settings_actions;

class SayForm extends Component {
  state = { language: 'English', message: '', name: '', speed: 1, voice: 0 };
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
    this.props.openSettings();
  };
  handleSettingsSubmit = (settings) => {
    if (!settings) return this.setState({ settings_open: false });
    const { language, name, speed, voice } = settings;
    this.setState({ language, name, speed, voice });
    this.props.closeSettings();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { language, message, name, speed, voice } = this.state;
    document.getElementById('message').select();
    this.props.onSubmit({ language, message, name, speed, voice });
  };
  render() {
    const { classes } = this.props;
    const { language, message, name, speed, voice } = this.state;
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
        </form>
        <SettingsDialog open={this.props.settings.open} onSubmit={this.handleSettingsSubmit} language={language} name={name} speed={speed} voice={voice} />
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

SayForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ settings }) => { return { settings } };

SayForm = connect(mapStateToProps, { closeSettings, openSettings })(SayForm);
SayForm = withStyles(styles)(SayForm);

export default SayForm;
