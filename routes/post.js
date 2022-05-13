const express = require('express');
const router = express.Router();

const { posts, getOne, create, update, destroy } = require('../controllers/post.controller');

router.get('/', posts);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
