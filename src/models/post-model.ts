import Sequelize from 'sequelize';

import sequelize from '../utils/database';

const Post = sequelize.define(
  'post',
  {
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
      type: Sequelize.TEXT,
      allowNull: false,
    },
    imageLink: {
      type: Sequelize.STRING,
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  }
);

export default Post;
