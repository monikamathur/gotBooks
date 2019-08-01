var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/got-books', { useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
  mongoose.set('useCreateIndex', true);
var bookRouter = require('./server/routes/book');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/gotBooks')));
app.use('/', express.static(path.join(__dirname, 'dist/gotBooks')));
app.use('/add', express.static(path.join(__dirname, 'dist/gotBooks')));
app.use('/list', express.static(path.join(__dirname, 'dist/gotBooks')));
app.use('/search', express.static(path.join(__dirname, 'dist/gotBooks')));
app.use('/api/book', bookRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});

module.exports = app;
