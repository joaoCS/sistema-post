const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = {
	async index(req, res) {
        
    },

    async store(req, res) {
        const { postId, text } = req.body;

        try {
        	const post = await Post.findById( postId );
        	const comment = await Comment.create({ text, post: postId, user: req.userId });

        	post.comments.push(comment);

        	await post.save();

        	return res.send({ comment });
        }
        catch(err) {
        	return res.status(400).send({ error: 'Erro ao criar comentario.' });
        }
    },

    async show(req, res) {
        
    },

    async update(req, res){
        
    },

    async destroy(req, res){
        
    },
};