const WebSocket = require('ws'),
  server = require('../server'),
  say = require('say'),
  cosmetic = require('cosmetic'),
  { runCommand } = require('../helpers'),
  { sounds } = require('../refs');

const history = [];
const wss = new WebSocket.Server({ server, path: '/websocket' });

wss.broadcast = (data) => {
  for (const client of wss.clients) if (client.readyState === WebSocket.OPEN) client.send(data);
};
wss.on('connection', (ws) => {
  ws.send(JSON.stringify(history));
  ws.on('message', (data) => {
    try {
      const chatter = JSON.parse(data);
      const { message, name, voice, sound, speed } = chatter;
      if (message) {
        say.stop();
        say.speak(message, voice, speed);
        history.push(chatter);
        console.log(`${new Date().toLocaleString()} | ${cosmetic.cyan(name ? name : voice)} said: ${message}`);
      } else if (!isNaN(sound)) {
        const sound_name = sounds[sound];
        if (!sound_name) return;
        runCommand(`afplay /System/Library/Sounds/${sound_name}.aiff`);
        console.log(`${new Date().toLocaleString()} | ${cosmetic.cyan(name || voice)} played: ${sound_name}`);
      } else return;
      wss.broadcast(data);
    } catch(err) {
      console.log(`${cosmetic.red(err.name)} | ${err.message}`);
    };
  });
});

module.exports = wss;
