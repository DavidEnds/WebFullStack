const mongoose = require('mongoose');
const Board = mongoose.model('Board');
const Data = mongoose.model('Data');

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

module.exports.getBoardById = function(req, res) {
	const id = req.params.board_id;

	Board.findById(id).then(function(board) {
		if (board) {
			res.render('board', { title: board.name, board: board });
		} else {
			res.redirect('/boards');
		}
	});
};

module.exports.saveData = function(req, res) {
	const board_id = req.query.board_id;
	const value = req.query.value;

	Board.findById(board_id).then(function(board) {
		if (!board) {
			res.status(404);
		}
	});

	const dataBoard = new Data({
		value: value,
		board: board_id
	});

	dataBoard.save().then(function(dataBoard) {
		if (dataBoard) {
			res.send('OK').status(200);
		}
	});
};
