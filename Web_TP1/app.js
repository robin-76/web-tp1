const express = require('express');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require('path');

// Import routes
const indexRouter = require('./routes/index');
const formRouter = require('./routes/form');
const aboutRouter = require('./routes/about');
const adsRouter = require('./routes/ads');
const validationRouter = require('./routes/validation');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const authRouter = require('./routes/auth');

const app = express();

const store = new MongoDBStore({
  uri: process.env.DB,
  collection: "sessions",
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use('/', indexRouter);
app.use('/form', formRouter);
app.use('/about', aboutRouter);
app.use('/ads', adsRouter);
app.use('/validation', validationRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);

module.exports = app;