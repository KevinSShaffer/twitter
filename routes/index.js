var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function(req, res) {
	res.render('login');
});
router.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/'
	}));

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
})

module.exports = router;