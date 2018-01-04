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
var locations = require('./routes/locations');

var main = express();

main.disable('etag');

main.use(logger('dev'));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(express.static(path.join(__dirname, './public')));

main.use('/', routes);
main.use('/users', users);
main.use('/runresults', runresults);
main.use('/friendlists', friendlists);
main.use('/groups', groups);
main.use('/paths', paths);
main.use('/notices', notices);
main.use('/groupparticipants', groupparticipants);
main.use('/locations',locations);

// catch 404 and forward to error handler
main.use(function(req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//================
// development error handler
// will print stacktrace
if (main.get('env') === 'development') {
  main.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error'+ err.message );
  });
}

// production error handler
// no stacktraces leaked to user
main.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('main.js:error  '+ err.message);
});


module.exports = main;