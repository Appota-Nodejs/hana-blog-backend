const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USERNAME,
//   process.env.PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//   }
// );

const sequelize = new Sequelize(
  process.env.URI_MYSQL
);

module.exports = sequelize;
