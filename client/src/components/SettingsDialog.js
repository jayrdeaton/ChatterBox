import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField } from '@material-ui/core';
import { LanguageSelect, SpeedSlider, VoiceSelect } from '../components';

class SettingsDialog extends Component {
  constructor(props) {
    super(props);
    const { language, name, speed, voice } = props;
    this.state = { language, name, speed, voice };
  };
  handleLanguageChange = (e) => {
    this.setState({ language: e.target.value });
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleSpeedChange = (e, speed) => {
    this.setState({ speed });
  };
  handleVoiceChange = (e) => {
    this.setState({ voice: e.target.value });
  };
  handleReset = () => {
    this.setState({
      language: 'English',
      name: '',
      speed: 1,
      voice: 'Alex'
    });
  };
  handleCancel = () => {
    this.props.onSubmit();
  };
  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };
  render() {
    const { classes } = this.props;
    const { language, name, speed, voice } = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onSubmit}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='settings-dialog'>Settings</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <Grid
              container
              direction='column'
              justify='space-between'
              alignItems='center'
              spacing={16}
            >
              <TextField
                id='name'
                label='Display Name'
                fullWidth
                className={classes.message}
                value={name}
                onChange={this.handleNameChange}
                variant='outlined'
              />
              <br />
              <Grid>
                <LanguageSelect onChange={this.handleLanguageChange} value={language} />
                <VoiceSelect onChange={this.handleVoiceChange} value={voice} language={language} />
              </Grid>
              <br />
              <SpeedSlider onChange={this.handleSpeedChange} value={speed} />
              <br />
              <Button onClick={this.handleReset}>
                Reset
              </Button>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color='secondary'>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color='primary'>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
};
const styles = theme => ({
  form: {
    margin: theme.spacing.unit * 2
  }
});
SettingsDialog = withStyles(styles)(SettingsDialog);
export default SettingsDialog;
