"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var sequelize = require('../utils/database');
var Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    imageLink: {
        type: Sequelize.STRING,
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
});
exports.default = Post;
