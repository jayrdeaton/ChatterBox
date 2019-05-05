import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppContent, AppHeader } from '../containers';

import Home from './Home';
import NotFound from './NotFound';

let App = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppHeader />
      <AppContent>
        <Switch>
          {/*<Route path='/' exact component={Test}/>*/}
          <Route path='/' component={Home}/>
          <Route component={NotFound} />
        </Switch>
      </AppContent>
    </div>
  );
};
const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  content: {
    padding: theme.spacing.unit * 3,
  },
  listItem: {
    padding: theme.spacing.unit * 2
  }
});
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

App = withRouter(App);
App = withStyles(styles)(App);

export default App;
