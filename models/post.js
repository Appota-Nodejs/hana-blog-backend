const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  author: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  }
});

module.exports = Post;
