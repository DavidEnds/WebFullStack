const express = require('express');

const app = express();
const PORT = 7000;

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

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

app.listen(PORT, function() {
	console.log('Running on port 7000');
});
