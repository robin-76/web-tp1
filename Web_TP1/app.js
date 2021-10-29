const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const formRouter = require('./routes/form');
const aboutRouter = require('./routes/about');
const announcesRouter = require('./routes/announces');
const validationRouter = require('./routes/validation');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const exampleRouter = require('./routes/example');
const verifyTokenRouter = require('./routes/verifyToken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/form', formRouter);
app.use('/about', aboutRouter);
app.use('/announces', announcesRouter);
app.use('/validation', validationRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/example', exampleRouter);
app.use('/verifyToken', verifyTokenRouter);

module.exports = app;