const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('nodejs-scraping:server');
const http = require('http');
const exphbs  = require('express-handlebars');
const routes = require('./routes');
// view engine setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: 'views/partials/'
}));
app.set('view engine', 'handlebars');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


var server = http.createServer(app);
server.listen(3000, function () {
    console.log('Express server listening on port ' + 3000);
});

module.exports = app;

