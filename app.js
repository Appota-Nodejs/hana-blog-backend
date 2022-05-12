const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const errorController = require('./controllers/error');
const db = require('./util/database');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An error occurred!' });
});

app.use(errorController.get404);

app.listen(process.env.PORT || 8000);
