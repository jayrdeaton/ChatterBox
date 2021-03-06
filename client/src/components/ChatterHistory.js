import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { sounds, voices } from '../refs';

let ChatterHistory = ({ classes, client, history, onClick, theme }) => {
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
                <Paper style={{color: 'white', backgroundColor: theme.palette.primary.main, padding: 0}} className={classes.paper}>
                  <ButtonBase className={classes.button} onClick={() => onClick(chatter)}>
                    {chatter.message ?
                      <Typography color='inherit' variant='subtitle1' component='p'>
                        {chatter.message}
                      </Typography>
                    : null}
                    {!isNaN(chatter.sound) ?
                      <Typography style={{width: '100%'}} align='center' color='inherit' variant='subtitle1' component='p'>
                        *{sounds[chatter.sound]}*
                      </Typography>
                    : null}
                  </ButtonBase>
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
                  <ButtonBase onClick={() => onClick(chatter)} style={{width: '100%', height: '100%', padding: theme.spacing.unit, justifyContent: 'flex-start'}}>
                    {chatter.message ?
                      <Typography color='textPrimary' variant='subtitle1' component='p'>
                        {chatter.message}
                      </Typography>
                    : null}
                    {!isNaN(chatter.sound) ?
                      <Typography style={{width: '100%'}} align='center' color='inherit' variant='subtitle1' component='p'>
                        *{sounds[chatter.sound]}*
                      </Typography>
                    : null}
                  </ButtonBase>
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
  button: {
    width: '100%',
    height: '100%',
    padding: theme.spacing.unit,
    justifyContent: 'flex-start'
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
