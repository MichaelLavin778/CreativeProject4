var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// const express = require('express');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let items = [];
let id = 0;

app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {
    id: id,
    name: req.body.name,
    text: req.body.text,
  };
  items.push(item);
  res.send(item);
});

app.get('/api/items', (req, res) => {
  res.send(items);
});

// app.put('/api/items/:id', (req, res) => {
//     // console.log("putting")
//   let id = parseInt(req.params.id);
//   let itemsMap = items.map(item => {
//     return item.id;
//   });
//   let index = itemsMap.indexOf(id);
//   if (index === -1) {
//     res.status(404)
//       .send("Sorry, that item doesn't exist");
//     return;
//   }
//   let item = items[index];
//   item.name = req.body.name
//   item.text = req.body.text;
//   // item.completed = req.body.completed;
//   res.send(item);
// });

// app.delete('/api/items/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let removeIndex = items.map(item => {
//       return item.id;
//     })
//     .indexOf(id);
//   if (removeIndex === -1) {
//     res.status(404)
//       .send("Sorry, that item doesn't exist");
//     return;
//   }
//   items.splice(removeIndex, 1);
//   res.sendStatus(200);
// });

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

app.listen(3000, () => console.log('Server listening on port 3000!'));
