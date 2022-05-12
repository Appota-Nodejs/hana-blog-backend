const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./utils/database');
const notFoundController = require('./controllers/not-found');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An error occurred!' });
});

app.use(notFoundController.get404);

app.listen(process.env.PORT || 8000);
