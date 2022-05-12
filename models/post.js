const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageLink: {
    type: Sequelize.STRING,
  },
  authorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Post;
