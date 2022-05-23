const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Comment = sequelize.define(
  'comment',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  }
);

module.exports = Comment;