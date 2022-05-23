const { validationResult } = require('express-validator');

const Post = require('../models/post');
const isValidInput = require('../utils/input-validator');

// Get all the posts - list
exports.posts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();

    return res.status(200).json({
      success: true,
      message: 'Get all the posts',
      posts,
    });
  } catch (error) {
    next(new Error('Error Server!'));
  }
};

// get one the post
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidInput(id, 'id')) {
      const error = new Error('Invalid inputs, please use valid inputs');
      return next(error);
    }

    const post = await Post.findOne({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Get one the post',
      post,
    });
  } catch (error) {
    next(new Error('Error Server!'));
  }
};

// create one the post
exports.create = async (req, res, next) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const error = new Error(
        'Invalid post, please check your inputs and try again later'
      );
      return next(error);
    }

    const { title, content, imageLink } = req.body;
    const authorId = req.userData.userId;
    if (
      !isValidInput(title, 'text') ||
      !isValidInput(content, 'text') ||
      !isValidInput(authorId, 'id')
    ) {
      const error = new Error('Invalid inputs, please use valid inputs');
      return next(error);
    }

    const post = await Post.create({
      title,
      content,
      imageLink,
      authorId,
    });

    res.status(201).json({
      success: true,
      message: 'Create the post success',
      post,
    });
  } catch (error) {
    next(new Error('Error Server!'));
  }
};

// update one the post
exports.update = async (req, res, next) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const error = new Error(
        'Invalid post, please check your inputs and try again later'
      );
      return next(error);
    }

    const body = req.body;
    const id = req.params.id;
    if (!isValidInput(id, 'id')) {
      const error = new Error('Invalid inputs, please use valid inputs');
      return next(error);
    }

    body['authorId'] = req.userData.userId;

    const post = await Post.update(body, {
      where: { id },
    });

    if (!post[0]) throw next(new Error('ID post is not found!'));

    res.status(200).json({
      success: true,
      message: 'Update the post success',
    });
  } catch (error) {
    next(new Error('Error Server!'));
  }
};

// delete one the post
exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidInput(id, 'id')) {
      const error = new Error('Invalid inputs, please use valid inputs');
      return next(error);
    }

    const post = await Post.destroy({
      where: { id },
    });
  
    if (!post) throw next(new Error('ID post is not found!'));

    res.status(200).json({
      success: true,
      message: 'Delete the post success',
    });
  } catch (error) {
    next(new Error('Error Server!'));
  }
};
