import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import uuid from 'uuid';
import { voices } from '../refs';
import { ChatterHistory, MessageForm, SettingsDialog } from '../components';

import { settings_actions } from '../actions';
const { closeSettings } = settings_actions;

const WS_DOMAIN = `ws://${process.env.REACT_APP_DOMAIN}` || '';

class ChatterBox extends Component {
  constructor(props) {
    super(props);

    const client = this.getClientId();
    this.state = {  client, history: [], language: 'English', message: '', name: '', speed: 1, voice: 0, websocket: null };

    this.MessageForm = createRef();
  };
  componentWillMount() {
    this.setupWebsocket();
  };
  getClientId() {
    let client_id = sessionStorage.getItem('chatterbox_client_id');
    if (!client_id) {
      client_id = uuid.v1();
      sessionStorage.setItem('chatterbox_client_id', client_id);
    };
    return client_id;
  };
  setupWebsocket = () => {
    const websocket = new WebSocket(`${WS_DOMAIN}/websocket/message`);
    // websocket.onopen = () => {
    //   console.log('websocket open');
    // };
    websocket.onmessage = (data) => {
      const { history } = this.state;
      try {
        const chatter = JSON.parse(data.data);
        if (chatter instanceof Array) {
          for (const c of chatter) {
            c.timestamp = new Date(c.timestamp);
            c.voice = voices[c.language].indexOf(c.voice);
            history.push(c);
          };
        } else {
          chatter.timestamp = new Date(chatter.timestamp);
          chatter.voice = voices[chatter.language].indexOf(chatter.voice);
          history.push(chatter);
        };
        this.setState({ history });
      } catch(err) {
        console.error(err);
      };
    };
    this.setState({ websocket });
  };
  updateHistory = (data) => {
    const { history } = this.state;
    history.push(data);
    this.setState({ history });
  };
  handleSettingsSubmit = (settings) => {
    if (settings) {
      const { language, name, speed, voice } = settings;
      this.setState({ language, name, speed, voice });
    };
    this.props.closeSettings();
  };
  handleSubmit = async (message) => {
    if (!message) return;
    const { client, language, name, speed, websocket  } = this.state;
    let { voice } = this.state;
    voice = voices[language][voice];
    const object = {
      client,
      id: uuid.v1(),
      language,
      message,
      name,
      speed,
      voice,
      timestamp: new Date()
    };
    try {
      await websocket.send(JSON.stringify(object));
    } catch(err) {
      console.error(err);
    };
  };
  handleRedo = ({ message, voice }) => {
    this.MessageForm.current.scrollIntoView({ behavior: 'smooth' });
    this.handleMessageSubmit({ message, voice });
  };
  render() {
    const { classes } = this.props;
    const { client, history, language, name, speed, voice } = this.state;
    return (
      <div className={classes.root}>
        <SettingsDialog open={this.props.settings.open} onSubmit={this.handleSettingsSubmit} language={language} name={name} speed={speed} voice={voice} />
        <div className={classes.formWrapper} ref={this.MessageForm}>
          <MessageForm voice={voice} onSubmit={this.handleSubmit} />
        </div>
        <ChatterHistory client={client} history={history} />
      </div>
    );
  };
};
const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'scroll'
  },
  formWrapper: {
    margin: theme.spacing.unit * 2
  },
  history: {
    flexDirection: 'column-reverse',
    margin: theme.spacing.unit * 2
  },
  said: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    paddingTop: 0
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  timestamp: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  redo: {
    marginLeft: 'auto'
  }
});

ChatterBox.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ settings }) => { return { settings } };

ChatterBox = connect(mapStateToProps, { closeSettings })(ChatterBox);
ChatterBox = withStyles(styles)(ChatterBox);
export default ChatterBox;
