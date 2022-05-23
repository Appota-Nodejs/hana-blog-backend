import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.SQL_URI);

export default sequelize;
