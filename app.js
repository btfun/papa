var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var template = require('art-template');
var os = require('os');
var app = express();


// 视图引擎设置
template.config('base', '');
template.config('extname', '.html');
template.config('encoding', 'utf-8');
template.config('openTag', '[[');
template.config('closeTag', ']]');
template.config('cache', false);
//template.config('compress', true);


// service discovery start
// discovery();

app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//资源托管
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', require('./routes/index'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send({
    message: err.message,
    status: err.status || 500,
    stack:  err.status!==404 ?err.stack:''
  });

});


process.on("uncaughtException", function (err) {

  //系统级异常监控
  console.info('进程异常:',err.message + "\n\n" + err.stack + "\n\n" + err.toString());



  setTimeout(function () {
    process.exit(1);
  }, 5000);

});


module.exports = app;
