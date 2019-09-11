//const mongoose = require('../database');

const User = require('../models/user');

const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const mailer = require('../modules/mailer');


function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400,
	});
}

module.exports = {
    async authenticate (req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) 
            return res.status(400).send({ error: 'User not found' });

        const equals = await bcrypt.compare(password, user.password);

        if (!equals)
            return res.status(400).send({ error: "Invalid password" });

        user.password = undefined;

        return res.send( {
            user,
            token: generateToken({ id: user.id })
        } )

    },

    async forgotPassword (req, res) {
        const { email } = req.body;

        try {

            const user = await User.findOne({ email });

            if (!user)
                return res.status(400).send({ error: 'User not found' });

            const token = crypto.randomBytes(20).toString('hex');

            const now  = new Date();

            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            });

            mailer.sendMail({
                to: email,
                from: 'joaoantoniogba@hotmail.com',
                template: 'auth/forgot_password',
                context: { token },
            }, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ error: 'Cannot send forgot password email' });
                }

                return res.send();
            });

        }
        catch(err) {
            return res.status(400).send({ error: 'Error on forgot password, try it again!' });
        }
    },

    async resetPassword(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

            if(!user)
                return res.status(400).send({ error: 'User not found' });

            if (token !== user.passwordResetToken) {

                return res.status(400).send({ error: 'Invalid token' });
            }

            const now = new Date();

            if (now > user.passwordResetExpires)
                return res.status(400).send('Token has expired. Generate a new one');

            user.password = password;

            await user.save();

            return res.send();

        }
        catch(err) {
            return res.status(400).send('Cannot reset password. Try it again.')
        }
    },

	async index(req, res) {
        
    },

    async store(req, res) {
        const { email } = req.body;

        try {

        	if (await User.findOne({ email }))
        		return res.status(400).send({ error: 'User already exists' });

        	const user = await User.create(req.body);

        	user.password = undefined;

        	return res.send({
        		user,
        		token: generateToken( { id: user.id } )
        	});
        }
        catch (err) {
        	return res.status(400).send('Registration has failed');
        }

    },

    async show(req, res) {
        
        const user = await User.findById(req.params.userId);

        if (!user)
            return res.status(400).send({ error: "User not found" });

        return res.send( user );
    },

    async update(req, res){
        
    },

    async destroy(req, res){
        
    },
};