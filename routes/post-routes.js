const express = require('express');

const router = express.Router();

const {
  posts,
  getOne,
  create,
  update,
  destroy,
} = require('../controllers/post-controller');
const authenticate = require('../middlewares/check-auth');

router.get('/', posts);
router.get('/:id', getOne);

router.post('/', authenticate, create);
router.put('/:id', authenticate, update);
router.delete('/:id', authenticate, destroy);

module.exports = router;
