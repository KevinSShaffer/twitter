var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressSession = require('express-session')
var passport = require('passport');
var LocalStrategy = require('passport-local');

// Setup app
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Authentication
app.use(expressSession({ 
	secret: "phone mouse speaker cup",	
	resave: false,
	saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware
app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/account'));

// Start server and connect to DB
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('App has started on port: ' + port);
});

mongoose.connect(process.env.TWITTER_MONGO_PATH, {
  useMongoClient: true
});