"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get404 = function (req, res, next) {
    res.status(404).json({ message: 'Page not found' });
};
exports.default = get404;
