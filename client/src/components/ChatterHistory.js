import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { voices } from '../refs';

let ChatterHistory = ({ classes, client, history, theme }) => {
  return (
    <div className={classes.root}>
      <div className={classes.appBarSpacer} />
      {history.map((chatter, index) =>
        <div key={chatter.id} className={classes.message}>
          {chatter.client === client ?
            <Grid container direction='row'>
              <div className={classes.spacer} />
              <div className={classes.chatter}>
                <Grid container direction='row'>
                  <Typography style={{marginLeft: 'auto'}} color='textSecondary' variant='caption'>
                    {chatter.name ? chatter.name : voices[chatter.language][chatter.voice]}
                  </Typography>
                </Grid>
                <Paper style={{color: 'white', backgroundColor: theme.palette.primary.main}} className={classes.paper}>
                  <Typography color='inherit' variant='subtitle1' component='p'>
                    {chatter.message}
                  </Typography>
                </Paper>
              </div>
            </Grid>
            :
            <Grid container direction='row'>
              <div className={classes.chatter}>
                <Grid container direction='row'>
                  <Typography color='textSecondary' variant='caption'>
                    {voices[chatter.language][chatter.voice]}
                  </Typography>
                </Grid>
                <Paper className={classes.paper}>
                  <Typography color='inherit' variant='subtitle1' component='p'>
                    {chatter.message}
                  </Typography>
                </Paper>
              </div>
              <div className={classes.spacer} />
            </Grid>
          }
        </div>
      )}
    </div>
  );
};
const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    flexDirection: 'column-reverse',
    margin: theme.spacing.unit * 2
  },
  spacer: {
    flex: 1
  },
  chatter: {
    minWidth: '20%',
    padding: theme.spacing.unit / 2,
    paddingTop: 0
  },
  paper: {
    padding: theme.spacing.unit
  },
  timestamp: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  redo: {
    marginLeft: 'auto'
  }
});

ChatterHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

ChatterHistory = withStyles(styles)(ChatterHistory);
ChatterHistory = withTheme()(ChatterHistory)
export default ChatterHistory;
