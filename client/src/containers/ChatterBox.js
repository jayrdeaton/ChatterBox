import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import uuid from 'uuid';
import { voices } from '../refs';
import { ChatterHistory, MessageForm, SettingsDialog, SoundsDialog } from '../components';

import { settings_actions, sounds_actions } from '../actions';
const { closeSettings } = settings_actions;
const { closeSounds } = sounds_actions;

const WS_DOMAIN = process.env.REACT_APP_DOMAIN ? `ws://${process.env.REACT_APP_DOMAIN}` : `ws://${window.location.host}`;

class ChatterBox extends Component {
  constructor(props) {
    super(props);

    const { client, language, name, speed, voice } = this.getDefaults();
    this.state = {  client, history: [], language, message: '', name, speed, voice, websocket: null };

    this.MessageForm = createRef();
  };
  componentWillMount() {
    this.setupWebsocket();
  };
  getDefaults = () => {
    let client = sessionStorage.getItem('chatterbox_client_id');
    if (!client) {
      client = uuid.v1();
      sessionStorage.setItem('chatterbox_client_id', client);
    };
    const language = sessionStorage.getItem('chatterbox_language') || 'English';
    const name = sessionStorage.getItem('chatterbox_name') || '';
    let speed = sessionStorage.getItem('chatterbox_speed') || 1;
    speed = parseFloat(speed);
    let voice = sessionStorage.getItem('chatterbox_voice') || Math.round(Math.random() * voices[language].length);
    voice = parseFloat(voice);
    return { client, language, name, speed, voice };
  };
  setDefaults = ({ language, name, speed, voice }) => {
    sessionStorage.setItem('chatterbox_language', language);
    sessionStorage.setItem('chatterbox_name', name);
    sessionStorage.setItem('chatterbox_speed', speed);
    sessionStorage.setItem('chatterbox_voice', voice);
  };
  setupWebsocket = () => {
    const websocket = new WebSocket(`${WS_DOMAIN}/websocket`);
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
    websocket.onclose = () => {
      setTimeout(this.setupWebsocket, 500);
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
      this.setDefaults(settings);
      const { language, name, speed, voice } = settings;
      this.setState({ language, name, speed, voice });
    };
    this.props.closeSettings();
  };
  handleSubmit = async ({ message, sound }) => {
    if (!message && isNaN(sound)) return;
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
      sound,
      timestamp: new Date()
    };
    try {
      await websocket.send(JSON.stringify(object));
    } catch(err) {
      console.error(err);
    };
  };
  handleReplay = ({ message, sound }) => {
    this.MessageForm.current.scrollIntoView({ behavior: 'smooth' });
    this.handleSubmit({ message, sound });
  };
  render() {
    const { classes } = this.props;
    const { client, history, language, name, speed, voice } = this.state;
    return (
      <div className={classes.root}>
        <SettingsDialog open={this.props.settings.open} onSubmit={this.handleSettingsSubmit} language={language} name={name} speed={speed} voice={voice} />
        <SoundsDialog open={this.props.sounds.open} onSubmit={this.handleSubmit} onClose={this.props.closeSounds} />
        <div className={classes.formWrapper} ref={this.MessageForm}>
          <MessageForm voice={voice} onSubmit={this.handleSubmit} />
        </div>
        <ChatterHistory client={client} history={history} onClick={this.handleReplay} />
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

const mapStateToProps = ({ settings, sounds }) => { return { settings, sounds } };

ChatterBox = connect(mapStateToProps, { closeSettings, closeSounds })(ChatterBox);
ChatterBox = withStyles(styles)(ChatterBox);
export default ChatterBox;
