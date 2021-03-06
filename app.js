var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//Adding mongoose to our proyect
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');

var app = express();

//Connect to mongoose
mongoose.connect('localhost:27017/node-angular');

// view engine setup
//Initialize our views folder
app.set('views', path.join(__dirname, 'views'));
//Sets the view engine we want to use
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//Bodyparser for post routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Parse cookies
app.use(cookieParser());

//Configures that only this folder will be accessible from outside
//With the static command we indicate that this folder holds our static files
//that we want to make accessible.
//It holds our JS and our CSS.
app.use(express.static(path.join(__dirname, 'public')));

//Middleware: Prevent Cross Origin Request Errors.
//Request coming from a diferent origin than the server.
//Security for when you split frontend and backend in different servers.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//Any requests, the appRoutes handles it (which is imported from /routes/app.js)
app.use('/', appRoutes);

//If a bad URL is typed by user or the URL is not found in routes:
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //In this case we send back to our index, controlled by Angular 2
  //Because Angular 2 takes care of our routes.
    return res.render('index');
});


module.exports = app;
