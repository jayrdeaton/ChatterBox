import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ThemeTypeButton from './ThemeTypeButton'
import { config } from '../refs';
import { drawer_actions } from '../actions';

const { openDrawer } = drawer_actions;

class AppHeader extends Component {
  render() {
    const { classes } = this.props;
    const { open } = this.props.drawer;
    return (
      <AppBar
        position='absolute'
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!open} className={classes.toolbar}>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            SayBot
          </Typography>
          <ThemeTypeButton />
        </Toolbar>
      </AppBar>
    );
  };
};
const styles = theme => ({
  toolbar: {
    paddingLeft: 24,
    paddingRight: 24
  },
  appBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    width: `calc(100% - ${config.drawer_width}px)`,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  }
});
const mapStateToProps = ({ drawer }) => {
  return { drawer };
};
AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};
AppHeader = connect(mapStateToProps, { openDrawer })(AppHeader);
AppHeader = withStyles(styles)(AppHeader);
export default AppHeader;
