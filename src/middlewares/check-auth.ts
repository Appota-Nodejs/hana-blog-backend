import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth: RequestHandler = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed');
    }

    const decodedToken: any = jwt.verify(token, `${process.env.JWT_KEY}`);
    res.locals.userId = decodedToken.userId;

    next();
  } catch (err) {
    const error = new Error('Authentication failed');
    return next(error);
  }
};

export default checkAuth;
