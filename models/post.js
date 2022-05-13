const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

<<<<<<< HEAD
const Post = sequelize.define('Post', {
=======
const Post = sequelize.define('post', {
>>>>>>> main
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
<<<<<<< HEAD
  author: {
    type: Sequelize.STRING
=======
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageLink: {
    type: Sequelize.STRING,
  },
  authorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
>>>>>>> main
  },
  content: {
    type: Sequelize.STRING
  }
});

module.exports = Post;
