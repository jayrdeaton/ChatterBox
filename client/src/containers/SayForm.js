import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

class SayForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>SayForm</div>
    );
  };
};
const styles = theme => ({

});

SayForm.propTypes = {
  classes: PropTypes.object.isRequired
};

SayForm = withStyles(styles)(SayForm);
export default SayForm;
