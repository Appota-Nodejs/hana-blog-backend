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

const sequelize = new Sequelize(process.env.SQL_URI);

module.exports = sequelize;
