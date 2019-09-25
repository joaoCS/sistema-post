const mongoose = require('../database');

const User = require('../models/user');
const Post = require('../models/post');

const authConfig = require('../config/auth');

module.exports = {
	async index(req, res) {
        try {

            const posts = await Post.find({}).populate(['user', 'comments']);

            return res.send(posts);


        }
        catch(err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro ao buscar posts' });
        }
    },

    async store(req, res) {
        try{
            const { title, image, image_name } = req.body;

            const post = await Post.create({ title, image, image_name, user: req.userId });

            return res.send({ post });

        }
        catch(err) {
            return res.status(400).send({ error: 'Erro ao criar post' });
        }
    },

    async show(req, res) {
        try{
            const post = await Post.findById(req.params.postId).populate(['user', 'comments']);

            return res.send(post);
        }
        catch(err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro ao carregar post!' });
        }
    },

    async update(req, res){
        try{
            const { title, image } = req.body;



            const post = await Post.findById(req.params.postId);

            if (String(post.user) === req.userId) {

                post.title = title;
                post.image = image;

                post.save();

                return res.send(post);
            }
            else {

                return res.status(401).send({ error: 'Sem autorizacao para atualizar post' });
            }
            
        }
        catch(err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro ao criar post' });
        }
    },

    async destroy(req, res){
        try {

            const post = await Post.findById(req.params.postId);


            if (String(post.user) === req.userId) {

                await Post.findByIdAndRemove(req.params.postId);               

            }
            else {

                return res.status(401).send({ error: 'Sem autorizacao para remover post' });
            }

            return res.send();

        }
        catch(err) {
            
            return res.status(400).send({ error: 'Error deleting post' })
        }
    },
};