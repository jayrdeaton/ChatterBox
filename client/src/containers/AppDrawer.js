import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ChevronLeft } from '@material-ui/icons';
import { config } from '../refs';

import { drawer_actions } from '../actions';
const { closeDrawer, openDrawer } = drawer_actions;

class AppDrawer extends Component {
  render() {
    const { classes } = this.props;
    const open = this.props.drawer.open ? true : false;
    return (
      <Drawer
        variant='persistent'
        classes={{
          paper: classNames(classes.drawerPaper),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.props.closeDrawer}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        {this.props.children}
      </Drawer>
    );
  };
};
const styles = theme => ({
  toolbar: {
    paddingsRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: config.drawer_width,
  },
});
const mapStateToProps = ({ drawer }) => {
  return { drawer };
};
AppDrawer.propTypes = {
  drawer: PropTypes.object.isRequired
};
AppDrawer = connect(mapStateToProps, { closeDrawer, openDrawer })(AppDrawer);
AppDrawer = withStyles(styles)(AppDrawer);
export default AppDrawer
