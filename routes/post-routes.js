const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const {
  posts,
  getOne,
  create,
  update,
  destroy
} = require('../controllers/post.controller');
const authenticate = require('../middlewares/check-auth');

router.get('/', posts);
router.get('/:id', getOne);

router.post(
  '/',
  authenticate,
  [check('content').not().isEmpty(), check('title').not().isEmpty()],
  create
);
router.put(
  '/:id',
  authenticate,
  [check('content').not().isEmpty(), check('title').not().isEmpty()],
  update
);
router.delete('/:id', authenticate, destroy);

module.exports = router;
