/**
 * Created by atulr on 05/07/15.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/groups');
var runresults = require('./routes/runresults');
var friendlists = require('./routes/friendlists');
var paths = require('./routes/paths');
var notices = require('./routes/notices');
var groupparticipants = require('./routes/groupparticipants');
var images = require('./routes/images');
var locations = require('./routes/locations');

var app = express();

app.disable('etag');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

app.use('/', routes);
app.use('/users', users);
app.use('/runresults', runresults);
app.use('/friendlists', friendlists);
app.use('/groups', groups);
app.use('/paths', paths);
app.use('/notices', notices);
app.use('/groupparticipants', groupparticipants);
app.use('/images',images);
app.use('/locations',locations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//================
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error'+ err.message );
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('app.js:error  '+ err.message);
});


module.exports = app;
