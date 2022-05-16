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
  [
    check('content').not().isEmpty().trim(),
    check('title').not().isEmpty().trim(),
  ],
  create
);
router.put(
  '/:id',
  checkAuth,
  [
    check('content').not().isEmpty().trim(),
    check('title').not().isEmpty().trim(),
  ],
  update
);
router.delete('/:id', checkAuth, destroy);

// Comment Routes

router.get('/:postId/comments', commentControllers.getComments);

router.use(checkAuth);

router.post(
  '/:postId/comments',
  [
    check('content').not().isEmpty().trim(),
    check('authorId').not().isEmpty().trim().escape(),
    check('postId').not().isEmpty().trim().escape(),
  ],
  commentControllers.createComment
);

module.exports = router;
