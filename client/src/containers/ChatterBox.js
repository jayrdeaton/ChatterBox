import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SayForm, VoiceSelect } from '../components';

const DOMAIN = process.env.REACT_APP_DOMAIN || '';

class ChatterBox extends Component {
  state = { message: '', voice: 'Alex' };
  handleSubmit = async ({ message, voice }) => {
    this.setState({ message, voice });
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
      <div className={classes.root}>
        <SayForm message={message} voice={voice} onSubmit={this.handleSubmit} />
      </div>
    );
  };
};
const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse'
  }
});

ChatterBox.propTypes = {
  classes: PropTypes.object.isRequired
};

ChatterBox = withStyles(styles)(ChatterBox);
export default ChatterBox;
