var express = require('express');        // call express
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var fileUpload = require('express-fileUpload');
var port = process.env.PORT || 8000;        // set our port

var routes = require('./routes/index');
var app = express();                 // define our app using express

// view engine setup (will probably need later)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// allows app to get data from POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//database connection + fix for mongoose promise library
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:q0pw9o@ds056009.mlab.com:56009/tryingnewthings');
// keep mongoose database connected
var options = { server: { socketOptions: { keepAlive: 1000, connectTimeoutMS: 1000 } },
                replset: { socketOptions: { keepAlive: 1000, connectTimeoutMS : 1000 } } };
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// Wait for the database connection to establish, then start the app.
db.once('open', function() {
});

// if a request is made, logs event
app.use(function (req, res, next) {
    console.log('event');
    next();
});

// // passport auth setup, will probably need later
// require('./config/passport')(passport);
// app.use(session({ secret: process.env.SESSION_SECRET }));
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// load routes, sends app to router.js
require('./router')(app);
module.exports = app;

app.listen(port);
console.log('Magic happens on port ' + port);
