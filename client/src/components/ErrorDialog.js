import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core';

class ErrorDialog extends Component {
  state = { name: null, message: null }
  componentWillReceiveProps(props) {
    if (props.error) this.setState({ name: props.error.name, message: props.error.message });
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="error-dialog">{this.state.name || 'Error'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.message || 'Message'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
};
const styles = theme => ({
  dialog: {
    // display: 'flex',
    // height: '100%',
    // width: '100%',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});
ErrorDialog = withStyles(styles)(ErrorDialog);
export default ErrorDialog;
