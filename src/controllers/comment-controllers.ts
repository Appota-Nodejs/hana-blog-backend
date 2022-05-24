import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import Comment from '../models/comment-model';
import Post from '../models/post-model';
import isValidInput from '../utils/input-validator';

const getComments: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;
  if (!isValidInput(postId, 'id')) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let correspondingPost: Post | null;
  try {
    correspondingPost = await Post.findByPk(postId);
  } catch (err) {
    const error = new Error('Get comment failed, please try again later');
    return next(error);
  }

  if (correspondingPost === null) {
    const error = new Error(
      'Invalid values for comment, please try again later'
    );
    return next(error);
  }

  const limit = 100;
  const offset = +req.query.offset! || 1;
  let total: number, comments: Comment[];
  try {
    const { count, rows } = await Comment.findAndCountAll({
      where: {
        postId: postId,
      },
      offset: (offset - 1) * limit,
      limit: limit,
    });
    total = count;
    comments = rows;
  } catch (err) {
    const error = new Error('Fetching comments failed, please try again later');
    return next(error);
  }

  res.status(200).json({ total: total, comments: comments });
};

const createComment: RequestHandler = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error(
      'Invalid comment, please check your inputs and try again later'
    );
    return next(error);
  }

  const {
    content,
    authorId,
    postId,
  }: { content: string; authorId: number; postId: number } = req.body;
  if (
    !isValidInput(content, 'text') ||
    !isValidInput(authorId, 'id') ||
    !isValidInput(postId, 'id')
  ) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let correspondingPost: Post | null;
  try {
    correspondingPost = await Post.findByPk(postId);
  } catch (err) {
    const error = new Error('Create comment failed, please try again later');
    return next(error);
  }

  if (correspondingPost === null) {
    const error = new Error(
      'Invalid values for comment, please try again later'
    );
    return next(error);
  }

  let createdComment: Comment;
  try {
    createdComment = await Comment.create({
      content: content,
      authorId: authorId,
      postId: postId,
    });
  } catch (err) {
    const error = new Error('Could not create comment');
    return next(error);
  }

  res.status(201).json({
    commentId: createdComment.id,
    content: createdComment.content,
    authorId: createdComment.authorId,
    postId: createdComment.postId,
  });
};

export default { createComment, getComments };
