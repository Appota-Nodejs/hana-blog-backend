import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  CreationOptional
} from 'sequelize';
// import {User} from './user';
// import sequelize from '../utils/database';
// import sequelize from '../utils/database';

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare imageLink: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // declare authorId: ForeignKey<User['id']>;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageLink: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  { tableName: 'Post', sequelize }
);

// const Post = sequelize.define(
//   'post',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     title: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     content: {
//       type: Sequelize.TEXT,
//       allowNull: false
//     },
//     imageLink: {
//       type: Sequelize.STRING
//     },
//     authorId: {
//       type: Sequelize.INTEGER,
//       allowNull: false
//     }
//   },
//   {
//     charset: 'utf8',
//     collate: 'utf8_unicode_ci'
//   }
// );

export default Post;
