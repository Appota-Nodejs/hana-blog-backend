const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/user-controllers');
const checkAuth = require('../middlewares/check-auth');

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

router.use(checkAuth);

router.get('/:userId', userControllers.getUser);

module.exports = router;
