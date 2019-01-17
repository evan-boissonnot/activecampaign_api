const Motor = require('./packages/core/motor/motor');

const log4js = require('log4js');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactRouter = require('./routes/contact');

const app = express();

app.locals.motor = new Motor(log4js.getLogger('app'));
app.locals.motor.run();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  app.locals.motor.logError(err.message);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
