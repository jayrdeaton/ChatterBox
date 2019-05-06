const express = require('express'),
  router = express.Router(),
  say = require('say'),
  { cyan } = require('cosmetic');

router.route('/')
  .post(async (req, res, next) => {
    const { message, voice, speed } = req.body;
    if (!message) return res.status(200).send();
    try {
      say.stop();
      say.speak(message, voice, speed);
      console.log(`${new Date().toLocaleString()} | ${cyan(voice)} said: ${message}`);
      res.status(200).send();
    } catch(err) {
      res.status(500).send(err);
    };
  });

module.exports = router;
