import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close as CloseButton, Redo as RedoIcon } from '@material-ui/icons';
import uuid from 'uuid';
import { SayForm } from '../components';

const DOMAIN = process.env.REACT_APP_DOMAIN || '';

class ChatterBox extends Component {
  state = { message: '', voice: 'Alex', history: [] };
  handleSubmit = async ({ message, voice }) => {
    const { history } = this.state;
    history.push({
      id: uuid.v1(),
      message,
      voice,
      timestamp: new Date()
    });
    this.setState({ message, voice, history });
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
  handleDelete = ({ id }) => {
    const { history } = this.state;
    for (const [index, said] of history.entries()) if (said.id === id) {
      history.splice(index, 1);
      break;
    };
    this.setState({ history });
  };
  handleRedo = ({ message, voice }) => {
    this.handleSubmit({ message, voice });
  };

  render() {
    const { classes } = this.props;
    const { history, message, voice } = this.state;
    return (
      <div className={classes.root}>
        <SayForm message={message} voice={voice} onSubmit={this.handleSubmit} />
        <div className={classes.history}>
          <div className={classes.appBarSpacer} />
          {history.map((said, index) =>
            <Paper key={index} className={classes.said}>
              <div className={classes.row}>
                <Typography color='textSecondary' variant='caption'>
                  {said.voice} Said:
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
  history: {
    flexDirection: 'column-reverse',
    marginBottom: theme.spacing.unit * 2
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
