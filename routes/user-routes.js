const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.post(
  '/login',
  [check('username').not().isEmpty(), check('password').isLength({ min: 6 })],
  userControllers.login
);

router.post(
  '/register',
  [
    check('username').not().isEmpty(),
    check('password').isLength({ min: 6 }),
    check('description').not().isEmpty(),
  ],
  userControllers.register
);

router.get('/:userId', userControllers.getUser);

module.exports = router;
