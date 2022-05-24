import Sequelize from 'sequelize';

import sequelize from '../utils/database';

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publicAddress: {
      type: Sequelize.STRING,
      unique: true,
    },
    nonce: {
      type: Sequelize.INTEGER.UNSIGNED,
      defaultValue: () => Math.floor(Math.random() * 1000000), // initial random value
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  }
);

export default User;
