const WebSocket = require('ws'),
  server = require('../server'),
  say = require('say'),
  cosmetic = require('cosmetic');


const wss = new WebSocket.Server({ server, path: '/websocket/message' });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    try {
      const { message, voice, speed } = JSON.parse(data);
      say.stop();
      say.speak(message, voice, speed);
      console.log(`${new Date().toLocaleString()} | ${cosmetic.cyan(voice)} said: ${message}`);
      ws.send(data);
    } catch(err) {
      console.log(`${cosmetic.red(err.name)} | ${err.message}`);
    };
  });
});

module.exports = wss;
