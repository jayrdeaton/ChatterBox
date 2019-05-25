import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle } from '@material-ui/core';
import { sounds } from '../refs';

class SoundsDialog extends Component {
  render() {
    const { classes, onClose, onSubmit } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleCancel}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        scroll={'body'}
      >
        <DialogTitle id='settings-dialog'>Sounds</DialogTitle>
        <DialogContent>
          {sounds.map((sound, index) =>
            <Button key={sound} variant="contained" color="primary" className={classes.button} onClick={() => onSubmit({ sound: index })}>
              {sound}
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
};
const styles = theme => ({
  button: {
    margin: theme.spacing.unit / 2
  }
});
SoundsDialog = withStyles(styles)(SoundsDialog);
export default SoundsDialog;
