const mongoose = require('mongoose');
const Board = mongoose.model('Board');

module.exports.createBoard = function(req, res) {
	const boardData = req.body;
	const board = new Board({
		name: boardData.name,
		description: boardData.description,
		owner: req.session.user._id
	});

	board.save().then(function(board) {
		if (board) {
			res.redirect('/');
		}
	});
};

module.exports.getUserBoards = function(req, res) {
	Board.find({ owner: req.session.user._id }).then(function(boards) {
		res.render('boards', { title: 'Your Boards', boards: boards });
	});
};
