const mongoose = require('../database');


const CommentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},

	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;