const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

module.exports.validateRegister = function(req, res, next) {
	const userData = req.body;
	User.findOne({ email: req.body.email }).then(function(user) {
		if (user) {
			res.render('register', { title: 'Register', error: 'Hay un usuario con ese email' });
		}
	});

	User.findOne({ username: req.body.username }).then(function(user) {
		if (user) {
			res.render('register', { title: 'Register', error: 'Hay un usuario con ese nombre' });
		}
	});

	next();
};

module.exports.registerUser = function(req, res) {
	const userData = req.body;
	const hashPassword = bcrypt.hashSync(userData.password, 8);
	const user = new User({
		email: userData.email,
		username: userData.username,
		password: hashPassword
	});

	user.save().then(function(user) {
		if (user) {
			res.redirect('/login');
		}
	});
};
