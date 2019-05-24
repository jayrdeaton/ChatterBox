const WebSocket = require('ws'),
  server = require('../server'),
  say = require('say'),
  cosmetic = require('cosmetic');

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
      const { message, name, voice, speed } = chatter;
      if (!message) return;
      say.stop();
      say.speak(message, voice, speed);
      history.push(chatter);
      console.log(`${new Date().toLocaleString()} | ${cosmetic.cyan(name ? name : voice)} said: ${message}`);
      wss.broadcast(data);
    } catch(err) {
      console.log(`${cosmetic.red(err.name)} | ${err.message}`);
    };
  });
});

module.exports = wss;
