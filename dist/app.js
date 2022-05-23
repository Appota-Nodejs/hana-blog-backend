"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var xss = require('xss-clean');
require('dotenv').config();
var sequelize = require('./utils/database');
var notFoundController = require('./controllers/not-found');
var userRoutes = require('./routes/user-routes');
var postRoutes = require('./routes/post-routes');
var User = require('./models/user');
var Post = require('./models/post');
var Comment = require('./models/comment');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(xss());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use(notFoundController);
app.use(function (error, req, res, next) {
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
    .then(function (result) {
    app.listen(process.env.PORT || 8000);
})
    .catch(function (err) {
    console.log(err);
});
