const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
require('dotenv').config();

const sequelize = require('./utils/database');
const notFoundController = require('./controllers/not-found');
const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(xss());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFoundController);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An error occurred!' });
});

Post.belongsTo(User, { foreignKey: 'authorId', onDelete: 'CASCADE' });
User.hasMany(Post, { foreignKey: 'authorId' });
Comment.belongsTo(User, { foreignKey: 'authorId', onDelete: 'CASCADE' });
User.hasMany(Comment, { foreignKey: 'authorId' });
Comment.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
Post.hasMany(Comment, { foreignKey: 'postId' });

sequelize
  .sync({ alter: true })
  .then((result) => {
    app.listen(process.env.PORT || 8000);
  })
  .catch((err) => {
    console.log(err);
  });
