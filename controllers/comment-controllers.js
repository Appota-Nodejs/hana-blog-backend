const Comment = require('../models/comment');

const getComments = async (req, res, next) => {
  const limit = 5;
  const postId = req.params.postId;
  const offset = req.query.offset;
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
  const { content, authorId, postId } = req.body;

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
