var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');

// Setup app
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Authentication
app.use(passport.initialize());
app.use(passport.session());
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use(require('./routes/index'));

// Middleware
app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

// Start server and connect to DB
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('App has started on port: ' + port);
});

mongoose.connect(process.env.TWITTER_MONGO_PATH, {
  useMongoClient: true
});