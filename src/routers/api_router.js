const express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  { say_controller } = require('../controllers'),
  { accessControl, catchAll } = require('../middlewares');

  router.all('*', accessControl);
  router.all('*', bodyParser.json());

  router.use('/say', say_controller);

  // catch api requests
  router.all('*', catchAll);

  module.exports = router;
