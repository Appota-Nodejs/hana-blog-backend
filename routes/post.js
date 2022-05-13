<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { posts } = require('../controllers/post.controller');

router.get('/posts', posts);

module.exports = router;
=======
// const express = require('express');

// const postControllers = require('../controllers/post-controllers');

// const router = express.Router();

// router.get('/', postControllers.getPosts);

// router.get('/:postId', postControllers.getPost);

// router.post('/:postId', postControllers.createPost);

// router.patch('/:postId', postControllers.updatePost);

// router.delete('/:postId', postControllers.deletePost);

// module.exports = router;
>>>>>>> main
