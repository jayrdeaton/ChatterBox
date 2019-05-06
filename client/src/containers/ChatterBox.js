import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close as CloseButton, Redo as RedoIcon } from '@material-ui/icons';
import uuid from 'uuid';
import { voices } from '../refs';
import { MessageForm, SettingsDialog } from '../components';

import { settings_actions } from '../actions';
const { closeSettings } = settings_actions;

const DOMAIN = process.env.REACT_APP_DOMAIN || '';

class ChatterBox extends Component {
  constructor(props) {
    super(props);
    this.MessageForm = createRef();
  };
  state = {  history: [], language: 'English', message: '', name: '', speed: 1, voice: 0 };
  handleSettingsSubmit = (settings) => {
    if (settings) {
      const { language, name, speed, voice } = settings;
      this.setState({ language, name, speed, voice });
    };
    this.props.closeSettings();
  };
  handleSubmit = async (message) => {
    if (!message) return;
    const { history, language, name, speed } = this.state;
    let { voice } = this.state;
    history.push({
      id: uuid.v1(),
      message,
      name,
      speed,
      voice,
      timestamp: new Date()
    });
    this.setState({ language, message, voice, history });
    voice = voices[language][voice];
    try {
      await fetch(`${DOMAIN}/api/say`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ message, name, speed, voice })
      });
    } catch(err) {
      console.log(err);
    };
  };
  handleDelete = ({ id }) => {
    const { history } = this.state;
    for (const [index, said] of history.entries()) if (said.id === id) {
      history.splice(index, 1);
      break;
    };
    this.setState({ history });
  };
  handleRedo = ({ message, voice }) => {
    this.MessageForm.current.scrollIntoView({ behavior: 'smooth' })
    this.handleMessageSubmit({ message, voice });
  };
  render() {
    const { classes } = this.props;
    const { history, language, message, name, speed, voice } = this.state;
    return (
      <div className={classes.root}>
        <SettingsDialog open={this.props.settings.open} onSubmit={this.handleSettingsSubmit} language={language} name={name} speed={speed} voice={voice} />
        <div className={classes.formWrapper} ref={this.MessageForm}>
          <MessageForm message={message} voice={voice} onSubmit={this.handleSubmit} />
        </div>
        <div className={classes.history}>
          <div className={classes.appBarSpacer} />
          {history.map((said, index) =>
            <Paper key={index} className={classes.said}>
              <div className={classes.row}>
                <Typography color='textSecondary' variant='caption'>
                  {voices[language][said.voice]} Said:
                </Typography>
                <Typography color='textSecondary' variant='caption' className={classes.timestamp}>
                  {said.timestamp.toLocaleString()}
                </Typography>
                <IconButton aria-label='redo' color='primary' fontSize='small' className={classes.button} onClick={() => this.handleRedo(said)}>
                  <RedoIcon />
                </IconButton>
                <IconButton aria-label='redo' color='secondary' fontSize='small' className={classes.button} onClick={() => this.handleDelete(said)}>
                  <CloseButton />
                </IconButton>
              </div>
              <Typography variant='subtitle1' component='p'>
                {said.message}
              </Typography>
            </Paper>
          )}
        </div>
      </div>
    );
  };
};
const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'scroll'
  },
  formWrapper: {
    margin: theme.spacing.unit * 2
  },
  history: {
    flexDirection: 'column-reverse',
    margin: theme.spacing.unit * 2
  },
  said: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    paddingTop: 0
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  timestamp: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  redo: {
    marginLeft: 'auto'
  }
});

ChatterBox.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ settings }) => { return { settings } };

ChatterBox = connect(mapStateToProps, { closeSettings })(ChatterBox);
ChatterBox = withStyles(styles)(ChatterBox);
export default ChatterBox;
