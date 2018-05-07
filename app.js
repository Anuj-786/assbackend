var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql= require('mysql');
// importin routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getBookmark = require('./routes/getbookmark');
var saveBookmark = require("./routes/saveBookmark")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection remote
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
	  	host: 'db4free.net',
	  	user: 'reactapp',
      password: 'reactapp123',
      database : 'reactapp'
	});
	connection.connect(function(error) {
		if(error) {
	    console.error('error connecting: ' + error.stack);
	    return;
	  }

	  console.log('connected as id ' + connection.threadId);
	});
	next();
});
// local testing mysql handler
// app.use(function(req, res, next){
// 	global.connection = mysql.createConnection({
// 	  	host: 'localhost',
// 	  	user: 'root',
//       password: 'root',
//       database : 'bookmark'
// 	});
// 	connection.connect();
// 	next();
// });

// setting app headers
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

	if(req.method === 'OPTIONS') {
		res.header("Access-Control-Allow-Methods", "POST,GET");
		return res.status(200).json({})
	}
  next();
});
// routes handler
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getbookmarks', getBookmark);
app.use('/savebookmark', saveBookmark);

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
