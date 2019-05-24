const express = require('express'),
  router = express.Router(),
  say = require('say'),
  cosmetic = require('cosmetic'),
  { runCommand } = require('../helpers'),
  { sounds } = require('../refs');

router.route('/')
  .post(async (req, res, next) => {
    let { name, sound, voice } = req.body;
    if (isNaN(sound)) return res.status(200).send();
    sound = sounds[sound];
    if (!sound) return res.status(404).send();
    try {
      runCommand(`afplay /System/Library/Sounds/${sound}.aiff`);
      console.log(`${new Date().toLocaleString()} | ${cosmetic.cyan(name || voice)} played: ${sound}`);
      res.status(200).send();
    } catch(err) {
      res.status(500).send(err);
    };
  });

module.exports = router;
