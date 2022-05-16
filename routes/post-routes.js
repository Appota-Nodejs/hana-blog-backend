const express = require('express');
const { check } = require('express-validator');

const {
  posts,
  getOne,
  create,
  update,
  destroy,
} = require('../controllers/post-controller');
const commentControllers = require('../controllers/comment-controllers');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

// Post Routes

router.get('/', posts);
router.get('/:id', getOne);

router.post(
  '/',
  checkAuth,
  [check('content').not().isEmpty(), check('title').not().isEmpty()],
  create
);
router.put(
  '/:id',
  checkAuth,
  [check('content').not().isEmpty(), check('title').not().isEmpty()],
  update
);
router.delete('/:id', checkAuth, destroy);

// Comment Routes

router.get('/:postId/comments', commentControllers.getComments);

router.use(checkAuth);

router.post(
  '/:postId/comments',
  [
    check('content').not().isEmpty(),
    check('authorId').not().isEmpty(),
    check('postId').not().isEmpty(),
  ],
  commentControllers.createComment
);

module.exports = router;
