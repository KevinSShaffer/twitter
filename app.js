
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(
  function(username, password, next) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { 
      	return next(err); 
      } else if (!user) { 
      	return next(null, false); 
      } else if (!user.verifyPassword(password)) { 
      	return next(null, false); 
      }

      return next(null, user);
    });
  }
));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/login', function(req, res) {
	res.render('login');
});
app.post('/login', passport.authenticate('local', {
		failureRedirect: '/login'
	}), function(req, res) {
		res.redirect('/');
});

app.get('/register', function(req, res) {
	res.render('register');
});
app.post('/register', function(req, res) {
	var newUser = req.body.user;	
	User.register({ username: newUser.username }, newUser.password, function(err, user) {
		if (err) {
			res.send('Unable to register');
		} else {
			var authenticate = User.authenticate();
			authenticate(newUser.username, newUser.password, function(err, result) {
			if (err) {
				res.send('Unable to authentice user');
			} else {
				res.user = result;
				res.redirect('/');
			}
			});
		}
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('App has started on port: ' + port);
});

mongoose.connect(process.env.TWITTER_MONGO_PATH, {
  useMongoClient: true
});