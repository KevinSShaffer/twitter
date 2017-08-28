var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	kweets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Kweet'
		}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);