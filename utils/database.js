const Sequelize = require('sequelize');

<<<<<<< HEAD
// database - username - password
=======
// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USERNAME,
//   process.env.PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//   }
// );

>>>>>>> main
const sequelize = new Sequelize(
  'mysql://root:MySQL.21@localhost:3306/hana-blog'
);

module.exports = sequelize;
