const express = require('express');
const { check } = require('express-validator');

const commentControllers = require('../controllers/comment-controllers');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.get('/:postId', commentControllers.getComments);

router.use(checkAuth);

router.post(
  '/:postId',
  [
    check('content').not().isEmpty(),
    // check('authorId').not().isEmpty(),
    // check('postId').not().isEmpty(),
  ],
  commentControllers.createComment
);

module.exports = router;
