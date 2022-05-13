const Post = require('../models/post');

exports.posts = async (req, res, next) => {
  try {
    // const posts = [{ content: 'Hello World', author: 'Le Thanh Son' }];
    await Post.create({
      content: 'Hello World',
      author: 'Le Thanh Son'
    });

    const posts = await Post.findAll();
    res.json(posts);
    // res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
