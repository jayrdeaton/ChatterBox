import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class Theme extends Component {
  render() {
    const { type } = this.props.theme;
    const theme = createMuiTheme({
      palette: {
      //   primary: {
      //     // light: '#a7b934',
      //     // main: '#343a40',
      //     // main: '#379441',
      //     // main: '#20aced'
      //     // dark: '#379441',
      //     // contrastText: '#fff',
      //   },
      //   secondary: {
      //     // light: '#ff7961',
      //     // main: '#a7b934',
      //     // main: '#42b04e'
      //     // main: '#20aced'
      //     // dark: '#ba000d',
      //     // contrastText: '#000',
      //   },
        type
      },
      typography: {
        useNextVariants: true,
      }
    });
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider>
    );
  };
};
const mapStateToProps = ({ theme }) => {
  return { theme };
};
Theme.propTypes = {
  theme: PropTypes.object.isRequired
};
Theme = connect(mapStateToProps)(Theme);
export default Theme;
