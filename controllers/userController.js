const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

module.exports.registerUser = function(req, res) {
	const userData = req.body;
	const user = new User({
		email: userData.email,
		username: userData.username,
		password: userData.password
	});

	user.save();
};
