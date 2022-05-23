import { RequestHandler } from 'express';

const get404: RequestHandler = (req, res, next) => {
  res.status(404).json({ message: 'Page not found' });
};

export default get404;
