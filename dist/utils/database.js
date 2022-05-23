"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('mysql://root:MySQL.21@localhost:3306/hana-blog');
exports.default = sequelize;
