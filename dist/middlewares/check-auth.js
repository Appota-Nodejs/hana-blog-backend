"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed');
        }
        var decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        var error = new Error('Authentication failed');
        return next(error);
    }
}
exports.default = checkAuth;
;
