import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RadioButtonChecked, RadioButtonUnchecked } from '@material-ui/icons';

import { theme_actions } from '../actions';
const { toggleDarkMode } = theme_actions;

let ThemeTypeButton = (props) => {
  const { classes, toggleDarkMode } = props;
  return (
    <IconButton color='inherit' aria-label='toggle theme' className={classes.button} onClick={toggleDarkMode}>
      {props.theme.type === 'dark' ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
    </IconButton>
  );
};
const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
  }
});
const mapStateToProps = ({ theme }) => {
  return { theme };
};
ThemeTypeButton = connect(mapStateToProps, { toggleDarkMode })(ThemeTypeButton);
ThemeTypeButton = withStyles(styles)(ThemeTypeButton);
export default ThemeTypeButton;
