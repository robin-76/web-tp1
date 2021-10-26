const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');

const app = express();
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index');
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/about'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Import MongoClient & connexion à la DB
 */
const tests = require('./dblp.json')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'testDB';
let db

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

app.use(express.json())

app.get('/tests', (req,res) => {
  res.status(200).json(tests)
})

app.get('/tests/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const test = tests.find(test => test.id === id)
  res.status(200).json(test)
})

app.post('/tests', (req,res) => {
  tests.push(req.body)
  res.status(200).json(tests)
})
app.put('/tests/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let test = tests.find(test => test.id === id)
  test.name =req.body.name
      test.city =req.body.city
      test.type =req.body.type
      res.status(200).json(test)
})

app.delete('/tests/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let test = tests.find(test => test.id === id)
  tests.splice(tests.indexOf(test),1)
  res.status(200).json(tests)
})

app.listen(8080, () => {
  console.log("Serveur à l'écoute")
})

module.exports = app;
