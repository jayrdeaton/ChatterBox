const express = require('express'),
  router = express.Router(),
  say = require('say');

router.route('/')
  .post(async (req, res, next) => {
    const { message, voice, speed } = req.body;
    if (!message) return res.status(200).send();
    try {
      say.stop();
      say.speak(message, voice, speed);
      res.status(200).send();
    } catch(err) {
      res.status(500).send(err);
    };
  });

module.exports = router;
