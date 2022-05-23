"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var validationResult = require('express-validator').validationResult;
var Post = require('../models/post');
var isValidInput = require('../utils/input-validator');
// Get all the posts - list
exports.posts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post.findAll()];
            case 1:
                posts = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: 'Get all the posts',
                        posts: posts,
                    })];
            case 2:
                error_1 = _a.sent();
                next(new Error('Error Server!'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// get one the post
exports.getOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error, post, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!isValidInput(id, 'id')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                return [4 /*yield*/, Post.findOne({
                        where: { id: id },
                    })];
            case 1:
                post = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: 'Get one the post',
                        post: post,
                    })];
            case 2:
                error_2 = _a.sent();
                next(new Error('Error Server!'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// create one the post
exports.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validationError, error, _a, title, content, imageLink, authorId, error, post, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                validationError = validationResult(req);
                if (!validationError.isEmpty()) {
                    error = new Error('Invalid post, please check your inputs and try again later');
                    return [2 /*return*/, next(error)];
                }
                _a = req.body, title = _a.title, content = _a.content, imageLink = _a.imageLink;
                authorId = req.userData.userId;
                if (!isValidInput(title, 'text') ||
                    !isValidInput(content, 'text') ||
                    !isValidInput(authorId, 'id')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                return [4 /*yield*/, Post.create({
                        title: title,
                        content: content,
                        imageLink: imageLink,
                        authorId: authorId,
                    })];
            case 1:
                post = _b.sent();
                res.status(201).json({
                    success: true,
                    message: 'Create the post success',
                    post: post,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                next(new Error('Error Server!'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// update one the post
exports.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validationError, error, body, id, error, post, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                validationError = validationResult(req);
                if (!validationError.isEmpty()) {
                    error = new Error('Invalid post, please check your inputs and try again later');
                    return [2 /*return*/, next(error)];
                }
                body = req.body;
                id = req.params.id;
                if (!isValidInput(id, 'id')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                body['authorId'] = req.userData.userId;
                return [4 /*yield*/, Post.update(body, {
                        where: { id: id },
                    })];
            case 1:
                post = _a.sent();
                if (!post[0])
                    throw next(new Error('ID post is not found!'));
                res.status(200).json({
                    success: true,
                    message: 'Update the post success',
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(new Error('Error Server!'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// delete one the post
exports.destroy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error, post, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!isValidInput(id, 'id')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                return [4 /*yield*/, Post.destroy({
                        where: { id: id },
                    })];
            case 1:
                post = _a.sent();
                if (!post)
                    throw next(new Error('ID post is not found!'));
                res.status(200).json({
                    success: true,
                    message: 'Delete the post success',
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(new Error('Error Server!'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
