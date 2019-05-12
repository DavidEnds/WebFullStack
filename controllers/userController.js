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

module.exports.login = function(req, res) {
	User.findOne({ email: req.body.email }).then(function(user) {
		if (!user) {
			res.render('login', { title: 'login', error: 'No hay un usuario con ese email' });
		}

		// si hemos llegado aqui es que hay un user

		const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

		if (isPasswordValid == false) {
			res.render('login', { title: 'Login', error: 'La contraseña es incorrecta.' });
		} else {
			req.session.user = user;
			res.redirect('/');
		}

		// si hemos llegado hasta aqui es que el usuario es correcto
	});
};

module.exports.checkSession = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.render('login', { title: 'Login', error: 'Debes estar logeado.' });
	}
};
