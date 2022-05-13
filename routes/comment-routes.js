const express = require('express');

const commentControllers = require('../controllers/comment-controllers');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.get('/:postId', commentControllers.getComments);

router.use(checkAuth);

router.post('/:postId', commentControllers.createComment);

module.exports = router;
