const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

app.get('/', function(req, res) {
	res.render('index', { title: 'Página principal' });
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

app.listen(PORT, function() {
	console.log('Running on port 7000');
});
