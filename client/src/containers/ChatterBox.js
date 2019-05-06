import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close as CloseButton, Redo as RedoIcon } from '@material-ui/icons';
import uuid from 'uuid';
import { SayForm } from '../components';
import { voices } from '../refs';

const DOMAIN = process.env.REACT_APP_DOMAIN || '';

class ChatterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {  history: [], language: 'English', message: '', voice: 0 };
    this.sayForm = createRef();
  };
  handleSubmit = async ({ language, message, name, speed, voice }) => {
    if (!message) return;
    const { history } = this.state;
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
    this.sayForm.current.scrollIntoView({ behavior: 'smooth' })
    this.handleSubmit({ message, voice });
  };

  render() {
    const { classes } = this.props;
    const { history, language, message, voice } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.formWrapper} ref={this.sayForm}>
          <SayForm message={message} voice={voice} onSubmit={this.handleSubmit} />
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

ChatterBox = withStyles(styles)(ChatterBox);
export default ChatterBox;
