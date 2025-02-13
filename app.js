var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var watchRouter = require('./routes/watch.router');
var userRouter = require('./routes/user.router');
var brandRouter = require('./routes/brand.router');
var commentRouter = require('./routes/comment.router');
//declare url and connect db
const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/watchstoreApi";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connect success");
}, (err) => { console.log(err); })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/watch', watchRouter);
app.use('/user', userRouter);
app.use('/brand', brandRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
