import { validationResult, Result, ValidationError } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const Post = require('../models/post');
const isValidInput = require('../utils/input-validator');

// interface for object data
interface RequestData {
  title: string;
  content: string;
  imageLink: string;
}

interface CustomResponse extends Response {
}

// Get all the posts - list
const posts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts: Array<object> = await Post.findAll();

    return res.status(200).json({
      success: true,
      message: 'Get all the posts',
      posts
    });
  } catch (error) {
    return next(new Error('Error Server!'));
  }
};

// get one the post
const getOne: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = Number(req.params.id);
    if (!isValidInput(id, 'id')) {
      const error: Error = new Error('Invalid inputs, please use valid inputs');
      return next(error);
    }

    const post: object = await Post.findOne({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Get one the post',
      post
    });
  } catch (error) {
    return next(new Error('Error Server!'));
  }
};

// create one the post
const create: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationError: Result<ValidationError> = validationResult(req);
    if (!validationError.isEmpty()) {
      const error: Error = new Error(
        'Invalid post, please check your inputs and try again later'
      );
      return next(error);
    }

    const body: RequestData = req.body;
    const { title, content, imageLink } = body;
    const authorId: number = res.locals.userId;

    if (
      !isValidInput(title, 'text') ||
      !isValidInput(content, 'text') ||
      !isValidInput(authorId, 'id')
    ) {
      const error: Error = new Error('Invalid inputs, please use valid inputs');
      return next(error);
    }

    const post: object = await Post.create({
      title: title,
      content: content,
      imageLink: imageLink,
      authorId: authorId
    });

    return res.status(201).json({
      success: true,
      message: 'Create the post success',
      post
    });
  } catch (error) {
    return next(new Error('Error Server!'));
  }
};

// update one the post
const update: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationError: Result<ValidationError> = validationResult(req);
    if (!validationError.isEmpty()) {
      const error: Error = new Error(
        'Invalid post, please check your inputs and try again later'
      );
      return next(error);
    }

    const body: RequestData = req.body;
    const { title, content, imageLink } = body;
    const id: number = Number(req.params.id);

    if (!isValidInput(id, 'id')) {
      const error: Error = new Error('Invalid inputs, please use valid inputs');
      return next(error);
    }

    const post: Array<number> = await Post.update(
      {
        title: title,
        content: content,
        imageLink: imageLink
      },
      {
        where: { id: id, authorId: res.locals.userId }
      }
    );

    if (!post[0]) throw next(new Error('ID post is not found!'));

    return res.status(200).json({
      success: true,
      message: 'Update the post success'
    });
  } catch (error) {
    return next(new Error('Error Server!'));
  }
};

// delete one the post
const destroy: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = Number(req.params.id);
    if (!isValidInput(id, 'id')) {
      const error: Error = new Error('Invalid inputs, please use valid inputs');
      return next(error);
    }

    const post: number = await Post.destroy({
      where: { id: id, authorId: res.locals.userId }
    });

    if (!post) throw next(new Error('ID post is not found!'));

    return res.status(200).json({
      success: true,
      message: 'Delete the post success'
    });
  } catch (error) {
    return next(new Error('Error Server!'));
  }
};

export { posts, getOne, create, update, destroy };
