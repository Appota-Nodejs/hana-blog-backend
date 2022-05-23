const { validationResult } = require('express-validator');

const Comment = require('../models/comment');
const Post = require('../models/post');
const isValidInput = require('../utils/input-validator');

const getComments = async (req, res, next) => {
  const postId = req.params.postId;
  if (!isValidInput(postId, 'id')) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let correspondingPost;
  try {
    correspondingPost = await Post.findByPk(postId);
  } catch (err) {
    const error = new Error('Get comment failed, please try again later');
    return next(error);
  }

  if (!correspondingPost) {
    const error = new Error(
      'Invalid values for comment, please try again later'
    );
    return next(error);
  }

  const limit = 100;
  const offset = req.query.offset || 1;
  let total, comments;
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

const createComment = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error(
      'Invalid comment, please check your inputs and try again later'
    );
    return next(error);
  }

  const { content, authorId, postId } = req.body;
  if (
    !isValidInput(content, 'text') ||
    !isValidInput(authorId, 'id') ||
    !isValidInput(postId, 'id')
  ) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let correspondingPost;
  try {
    correspondingPost = await Post.findByPk(postId);
  } catch (err) {
    const error = new Error('Create comment failed, please try again later');
    return next(error);
  }

  if (!correspondingPost) {
    const error = new Error(
      'Invalid values for comment, please try again later'
    );
    return next(error);
  }

  const newComment = new Comment({
    content,
    authorId,
    postId,
  });

  let createdComment;
  try {
    createdComment = await newComment.save();
  } catch (err) {
    const error = new Error('Could not create comment');
    return next(error);
  }

  res.status(201).json({
    commentId: createdComment.dataValues.id,
    content: createdComment.dataValues.content,
    authorId: createdComment.dataValues.authorId,
    postId: createdComment.dataValues.postId,
  });
};

module.exports = { createComment, getComments };
