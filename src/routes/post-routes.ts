import express from 'express';
import { check }from 'express-validator';

import {
  posts,
  getOne,
  create,
  update,
  destroy,
}  from '../controllers/post-controller';
// import commentControllers from '../controllers/comment-controllers';
import checkAuth from '../middlewares/check-auth';

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

// router.get('/:postId/comments', commentControllers.getComments);

router.use(checkAuth);

// router.post(
//   '/:postId/comments',
//   [
//     check('content').not().isEmpty().trim(),
//     check('authorId').not().isEmpty().trim().escape(),
//     check('postId').not().isEmpty().trim().escape(),
//   ],
//   commentControllers.createComment
// );

module.exports = router;
