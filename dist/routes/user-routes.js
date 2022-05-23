"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var check = require('express-validator').check;
var userControllers = require('../controllers/user-controllers');
var router = express.Router();
router.post('/register', [
    check('username').not().isEmpty().trim().escape(),
    check('password').trim().isLength({ min: 6 }).escape(),
    check('description').not().isEmpty().trim(),
], userControllers.register);
router.post('/login', [
    check('username').not().isEmpty().trim().escape(),
    check('password').trim().isLength({ min: 6 }).escape(),
], userControllers.login);
router.get('/:publicAddress', userControllers.getPublicAddress);
router.post('/metamask-login', [
    check('signature').not().isEmpty().trim(),
    check('publicAddress').not().isEmpty().trim(),
], userControllers.metamaskLogin);
router.get('/:userId', userControllers.getUser);
exports.default = router;
