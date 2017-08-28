var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// INDEX
router.get('/', function(req, res) {
	res.render('index');
});

// NEW
router.get('/new', function(req, res) {
	res.render('account/new');
});

// EDIT
router.get('/:name/edit', function(req, res) {
	res.send('edit page');
});

// SHOW
router.get('/:name', function(req, res) {
	res.send('show page');
});

// CREATE
router.post('/', function(req, res) {
	User.register(new User({ username: req.body.username }), req.body.password, function(err) {
		if (err) {
			res.send('Error during registration: ' + err);
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/');
			});
		}
	});
});

// UPDATE
router.put('/:name', function(req, res) {
	res.send('update page');
});

// DESTROY
router.delete('/:name', function(req, res) {
	res.send('delete page');
});

module.exports = router;