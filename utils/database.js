const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_URI);

module.exports = sequelize;
