const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv/config')
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');
const formRouter = require('./routes/form');
const announceRouter = require('./routes/announce');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/form', formRouter);
app.use('/announce', announceRouter);

// Routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index');
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/about'));
});

app.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/form'));
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
    console.log('Connected to DB !')
);

// How we start listening to the server
app.listen(3000, () => {
  console.log("Server listening")
});

module.exports = app;
