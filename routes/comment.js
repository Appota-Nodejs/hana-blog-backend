const express = require('express');

const commentControllers = require('../controllers/comment-controllers');

const router = express.Router();

router.patch('/:postId', commentControllers.createComment);

module.exports = router;
