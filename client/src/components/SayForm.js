import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Fab, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Send as SendIcon } from '@material-ui/icons';
import { VoiceSelect } from '../components';

const DOMAIN = process.env.REACT_APP_DOMAIN || '';

class SayForm extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', voice: 'Alex' };
    this.messageInput = createRef();
  };

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
  handleSubmit = (e) => {
    e.preventDefault();
    const { message, voice } = this.state;
    this.props.onSubmit({ message, voice });
  };
  render() {
    const { classes } = this.props;
    const { message, voice } = this.state;
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
            ref={this.messageInput}
          />
          <div className={classes.voice}>
            <VoiceSelect value={voice} onChange={this.handleVoiceChange} />
          </div>
          <Fab
            color='primary'
            type='submit'
            className={classes.submit}
          >
            <SendIcon />
          </Fab>
        </Grid>
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
