const mongoose = require('../database');

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
	},

	image: {
		type: String,
	},

	image_name		: {
		type: String,
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],

	createdAt: {
		type: Date,
		default: Date.now
	}

});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;