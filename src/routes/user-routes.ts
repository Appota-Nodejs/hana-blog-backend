import express from 'express';
import { check } from 'express-validator';

import userControllers from '../controllers/user-controllers';

const router = express.Router();

router.post(
  '/register',
  [
    check('username').not().isEmpty().trim().escape(),
    check('password').trim().isLength({ min: 6 }).escape(),
    check('description').not().isEmpty().trim(),
  ],
  userControllers.register
);

router.post(
  '/login',
  [
    check('username').not().isEmpty().trim().escape(),
    check('password').trim().isLength({ min: 6 }).escape(),
  ],
  userControllers.login
);

router.get('/public-address/:publicAddress', userControllers.getPublicAddress);

router.post(
  '/metamask-login',
  [
    check('signature').not().isEmpty().trim(),
    check('publicAddress').not().isEmpty().trim(),
  ],
  userControllers.metamaskLogin
);

router.get('/:userId', userControllers.getUser);

export default router;
