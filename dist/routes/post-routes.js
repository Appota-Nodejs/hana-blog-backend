"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var check = require('express-validator').check;
var _a = require('../controllers/post-controller'), posts = _a.posts, getOne = _a.getOne, create = _a.create, update = _a.update, destroy = _a.destroy;
var commentControllers = require('../controllers/comment-controllers');
var checkAuth = require('../middlewares/check-auth');
var router = express.Router();
// Post Routes
router.get('/', posts);
router.get('/:id', getOne);
router.post('/', checkAuth, [
    check('content').not().isEmpty().trim(),
    check('title').not().isEmpty().trim(),
], create);
router.put('/:id', checkAuth, [
    check('content').not().isEmpty().trim(),
    check('title').not().isEmpty().trim(),
], update);
router.delete('/:id', checkAuth, destroy);
// Comment Routes
router.get('/:postId/comments', commentControllers.getComments);
router.use(checkAuth);
router.post('/:postId/comments', [
    check('content').not().isEmpty().trim(),
    check('authorId').not().isEmpty().trim().escape(),
    check('postId').not().isEmpty().trim().escape(),
], commentControllers.createComment);
exports.default = router;
