const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.post(
  '/login',
  [
    check('username').not().isEmpty().trim().escape(),
    check('password').trim().isLength({ min: 6 }).escape(),
  ],
  userControllers.login
);

router.post(
  '/register',
  [
    check('username').not().isEmpty().trim().escape(),
    check('password').trim().isLength({ min: 6 }).escape(),
    check('description').not().isEmpty().trim(),
  ],
  userControllers.register
);

router.get('/:userId', userControllers.getUser);

module.exports = router;
