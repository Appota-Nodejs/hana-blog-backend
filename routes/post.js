const express = require('express');
const router = express.Router();

const { posts } = require('../controllers/post.controller');

router.get('/posts', posts);

module.exports = router;
