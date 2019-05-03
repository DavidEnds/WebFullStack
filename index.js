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
app.use(bodyParser.json());

app.get('/', function(rec, res) {
	res.render('index');
});

app.get('/register', function(rec, res) {
	res.render('register');
});

app.get('/login', function(rec, res) {
	res.render('login');
});

app.get('/boards', function(rec, res) {
	res.render('boards');
});

app.post('/register', userController.registerUser);

app.listen(PORT, function() {
	console.log('Running on port 7000');
});
