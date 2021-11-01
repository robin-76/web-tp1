const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require('path');
const indexRouter = require('./routes/index');
const formRouter = require('./routes/form');
const aboutRouter = require('./routes/about');
const announcesRouter = require('./routes/announces');
const validationRouter = require('./routes/validation');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const authRouter = require('./routes/auth');

require('dotenv').config();

const app = express();

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/LeBonLogement",
  collection: "sessions",
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use('/', indexRouter);
app.use('/form', formRouter);
app.use('/about', aboutRouter);
app.use('/announces', announcesRouter);
app.use('/validation', validationRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);

module.exports = app;