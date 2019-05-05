import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { config } from '../refs';

class AppContent extends Component {
  render() {
    const { classes } = this.props;
    const { open } = this.props.drawer;
    return (
      <main className={classNames(classes.content, !open && classes.contentShift)}>
        {this.props.children}
      </main>
    );
  };
};
const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: config.drawer_width,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }
});
const mapStateToProps = ({ drawer }) => {
  return { drawer };
};
AppContent.propTypes = {
  classes: PropTypes.object.isRequired
};
AppContent = connect(mapStateToProps)(AppContent)
AppContent = withStyles(styles)(AppContent);
export default AppContent;
