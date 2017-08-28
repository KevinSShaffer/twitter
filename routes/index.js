var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/login', function(req, res) {
	res.render('login');
});
router.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/'
	}));

router.get('/register', function(req, res) {
	res.render('register');
});
router.post('/register', function(req, res) {
	var newUser = req.body.user;	
	User.register({ username: newUser.username }, newUser.password, function(err, user) {
		if (err) {
			res.send('Unable to register');
		} else {
			User.authenticate(newUser.username, newUser.password, function(err, result) {
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

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
})

module.exports = router;