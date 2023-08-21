var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');
var fileUpload = require ('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var portfolioRouter = require('./routes/portfolio');
var serviciosRouter = require('./routes/servicios');
var contactoRouter = require('./routes/contacto');
var loginRouter = require ('./routes/admin/login');
var adminRouter = require ('./routes/admin/novedades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'sadasdsad',
  resave: false,
  saveUninitialized:true
}))

secured = async (req, res, next)=> {
  try{
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next ();
    } else { 
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/portfolio', portfolioRouter);
app.use('/servicios', serviciosRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', adminRouter);


app.get ('/about', function (req, res) { res.send ('hola, soy la pagina de about')});
app.get ('/portfolio', function (req, res) { res.send ('hola, soy la pagina de portfolio')});
app.get ('/servicios', function (req, res) { res.send ('hola, soy la pagina de servicios')});
app.get ('/contacto', function (req, res) { res.send ('hola, soy la pagina de contacto')})




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
