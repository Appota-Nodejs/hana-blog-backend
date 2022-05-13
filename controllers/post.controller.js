const Post = require('../models/post');

// Get all the posts - list
exports.posts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json({
      success: true,
      message: 'Get all the posts',
      posts
    });
  } catch (error) {
    next(error);
  }
};

// get one the post
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await Post.findOne({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Get one the post',
      post
    });
  } catch (error) {
    next(error);
  }
};

// create one the post
exports.create = async (req, res, next) => {
  try {
    const { title, content, imageLink, authorId } = req.body;

    const post = await Post.create({
      title,
      content,
      imageLink,
      authorId
    });

    res.status(201).json({
      success: true,
      message: 'Create the post success',
      post
    });
  } catch (error) {
    next(error);
  }
};

// update one the post
exports.update = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;

    await Post.update(body, {
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Update the post success'
    });
  } catch (error) {
    next(error);
  }
};

// delete one the post
exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Post.destroy({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Delete the post success'
    });
  } catch (error) {
    next(error);
  }
};
