const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
	value: {
		type: Number,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	board: {
		type: mongoose.Schema.ObjectId,
		ref: 'Board',
		requied: true
	}
});

module.exports = mongoose.model('Data', DataSchema);
