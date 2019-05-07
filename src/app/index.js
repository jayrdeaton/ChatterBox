const createError = require('http-errors'),
  morgan = require('morgan'),
  express = require('express'),
  cors = require('cors'),
  { join } = require('path'),
  routers = require('../routers'),
  { api_router } = routers,
  app = express();

// view engine setup
app.set('views', join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
// other plugins
app.use(morgan('dev'));
app.use(cors());
// serve react build
app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));
// routers
app.use('/api', api_router);

// catchAll / send file
app.use('*', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
