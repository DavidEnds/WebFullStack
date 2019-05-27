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

BoardSchema.virtual('data', {
	ref: 'Data',
	localField: '_id',
	foreignField: 'board'
});

function autopopulate(next) {
	this.populate('data');
	next();
}

BoardSchema.pre('find', autopopulate);
BoardSchema.pre('findOne', autopopulate);
BoardSchema.pre('findById', autopopulate);

module.exports = mongoose.model('Board', BoardSchema);
