const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const sequelize = require('./utils/database');
const notFoundController = require('./controllers/not-found');
const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');
const commentRoutes = require('./routes/comment-routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/api/comments', commentRoutes);

app.use(notFoundController.get404);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An error occurred!' });
});

sequelize
  .sync({ alter: true })
  .then((result) => {
    app.listen(process.env.PORT || 8001);
  })
  .catch((err) => {
    console.log(err);
  });
