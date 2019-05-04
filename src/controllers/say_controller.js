const express = require('express'),
  router = express.Router(),
  { runCommand } = require('../helpers');

router.route('/')
  .post(async (req, res, next) => {
    const { message } = req.body;
    if (!message) return res.status(200).send();
    try {
      await runCommand(`say ${message}`);
      res.status(200).send();
    } catch(err) {
      res.status(500).send(err);
    };
  });

module.exports = router;
