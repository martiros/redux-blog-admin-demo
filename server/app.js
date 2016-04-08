import express from 'express';
const logger = require('morgan');
const bodyParser = require('body-parser');

const articles = require('./routes/articles');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', articles);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      status: 'ERROR',
      message: err.message,
      error: err,
    });
    next();
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      status: 'ERROR',
      message: err.message,
      error: {},
    });
    next();
  });
}

module.exports = app;
