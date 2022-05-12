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
  'mysql://root:MySQL.21@localhost:3306/hana-blog'
);

module.exports = sequelize;
