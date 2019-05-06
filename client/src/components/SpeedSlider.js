import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { config } from '../refs';

class SpeedSlider extends Component {
  render() {
    const { classes, value } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='caption' id='speed-slider-label'>Speed {value}</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby='speed-slider-label'
          onChange={this.props.onChange}
          min={0}
          max={config.speed_limit}
        />
      </div>
    );
  };
};
const styles = theme => ({
  root: {
    width: '100%',
  },
  slider: {
    padding: '22px 0px',
  }
});
SpeedSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
};
SpeedSlider = withStyles(styles)(SpeedSlider);
export default SpeedSlider;
