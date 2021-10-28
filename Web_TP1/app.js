const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const formRouter = require('./routes/form');
const aboutRouter = require('./routes/about');
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

module.exports = app;