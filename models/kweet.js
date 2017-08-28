var mongoose = require('mongoose');

var kweetSchema = new mongoose.Schema({
	text: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.export = mongoose.model('Kweet', kweetSchema);