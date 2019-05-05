const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const PORT = 7000;

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', function(error) {
	console.log('Erroraso:', error);
});

require('./models/User');
const userController = require('./controllers/userController');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(cookieParser());

const cookieConfig = {
	key: 'user_sid',
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000
	}
};

app.use(session(cookieConfig));

app.use(function(req, res, next) {
	if (req.cookies.user_sid && !req.session.user) {
		res.clearCookie('user_sid');
	}
	next();
});

app.use(function(req, res, next) {
	if (req.session.user) {
		res.locals.user = req.session.user;
	}
	next();
});

app.get('/', function(req, res) {
	res.render('index', { title: 'Nuclear Boards' });
});

app.get('/register', function(req, res) {
	res.render('register', { title: 'Register' });
});

app.get('/login', function(req, res) {
	res.render('login', { title: 'Login' });
});

app.get('/boards', function(req, res) {
	res.render('boards', { title: 'Boards' });
});

app.post('/register', userController.validateRegister, userController.registerUser);

app.post('/login', userController.login);

app.use(function(req, res) {
	res.render('404', { title: 'Error 404' });
});

app.listen(PORT, function() {
	console.log('Running on port 7000');
});
