const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const session      = require("express-session");
const passport     = require("passport");
const app = express();


// Load enviroment variable form the ".env" file
// (put this before the setup file since defines env variables)
require("dotenv").config();
// run the code that setup the Mongoose database connection'
require("./config/mongoose-setup");

// run the code that setup the Passport
require("./config/passport-setup");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'ZOOM';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "this srting is to avoid errors"
  })
);

// these Passport lines need to go AFTER the session setup
app.use (passport.initialize());
app.use (passport.session());

//defines a costmo middleware to define " currentUser" in all our views
app.use((req, res, next) => {
  // passport defines "req.user" if the user is logged in
  // ("req.user" is the result of deserialize)
  res.locals.currentUser = req.user;

  // call "next()" to tell Wxpress that we've finished
  // (otherwise your browser will hang)
  next();
});

// Start ROUTER----------------------------------------------------

const index = require('./routes/index');
app.use('/', index);

const myUserRouter = require("./routes/user-router");
app.use(myUserRouter);

const myChatRouter = require("./routes/chat-router");
app.use(myChatRouter);

const myRoom = require("./routes/preferences-router");
app.use(myRoom);

const myContactRouter = require("./routes/contacts-router");
app.use(myContactRouter);

const myAdminRouter = require("./routes/admin-router");
app.use(myAdminRouter);

const myListRouter = require("./routes/list-goals-router");
app.use(myListRouter);

// END ROUTER------------------------------------------------------

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
