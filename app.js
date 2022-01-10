var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rateLimit = require('express-rate-limit');
var RedisStore = require("rate-limit-redis");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var peopleRouter = require('./routes/people');
var machineRouter = require('./routes/machine');
var materialRouter = require('./routes/material');

var { checkAPP, checkUser, checkAdmin } = require('./util/middleware') //引入中间件

var app = express();

//express解决跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  next();
})

//swagger api 文档
app.use('/apidocs', express.static('public/dist'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', checkAPP, usersRouter);
app.use('/people', peopleRouter);
app.use('/machine', [checkAPP, checkUser, checkAdmin], machineRouter);
app.use('/matetial', materialRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler 自定义错误处理中间件
app.use(function (err, req, res, next) {
  res.json({ code: 5, message: err.message, data: [] })
});

module.exports = app;
