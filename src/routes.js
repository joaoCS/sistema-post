const express = require('express');

const router = express.Router();

const authMiddleware = require('./middlewares/auth');

const AuthController = require('./controllers/authController');
const PostController = require('./controllers/postController');
const CommentController = require('./controllers/commentController');


router.post('/register', AuthController.store);
router.post('/authenticate', AuthController.authenticate);
router.post('/forgot_password', AuthController.forgotPassword);
router.post('/reset_password', AuthController.resetPassword);



router.get('/posts', PostController.index);
router.get('/posts/:postId', PostController.show);
router.post('/post/', authMiddleware, PostController.store);
router.put('/post/:postId', authMiddleware, PostController.update);
router.delete('/post/:postId', authMiddleware, PostController.destroy);




router.post('/comment', authMiddleware, CommentController.store);

router.get('/user/:userId', AuthController.show);


module.exports = router;