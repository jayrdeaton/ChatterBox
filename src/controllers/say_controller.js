const express = require('express'),
  router = express.Router(),
  say = require('say'),
  cosmetic = require('cosmetic'),
  { runCommand } = require('../helpers');

router.route('/')
  .post(async (req, res, next) => {
    const { message, name, voice, speed } = req.body;
    if (!message) return res.status(200).send();
    try {
      say.stop();
      say.speak(message, voice, speed);
      // runCommand(`say ${voice ? `-v ${voice}` : ''} ${speed ? `-r ${speed}` : ''} ${message}`)
      console.log(`${new Date().toLocaleString()} | ${cosmetic.cyan(name || voice)} said: ${message}`);
      res.status(200).send();
    } catch(err) {
      res.status(500).send(err);
    };
  });

module.exports = router;
