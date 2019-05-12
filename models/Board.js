const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	description: {
		type: String
	}
});

module.exports = mongoose.model('Board', BoardSchema);
