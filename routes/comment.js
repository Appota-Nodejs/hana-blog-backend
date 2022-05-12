const express = require('express');

const commentControllers = require('../controllers/comment-controllers');

const router = express.Router();

router.post('/:postId', commentControllers.createComment);

module.exports = router;
