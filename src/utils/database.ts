import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'mysql://root:MySQL.21@localhost:3306/hana-blog'
);

export default sequelize;
