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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var comment_1 = __importDefault(require("../models/comment"));
var post_1 = __importDefault(require("../models/post"));
var input_validator_1 = __importDefault(require("../utils/input-validator"));
var getComments = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, error, correspondingPost, err_1, error, error, limit, offset, total, comments, _a, count, rows, err_2, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                postId = req.params.postId;
                if (!input_validator_1.default(postId, 'id')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_1.default.findByPk(postId)];
            case 2:
                correspondingPost = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                error = new Error('Get comment failed, please try again later');
                return [2 /*return*/, next(error)];
            case 4:
                if (!correspondingPost) {
                    error = new Error('Invalid values for comment, please try again later');
                    return [2 /*return*/, next(error)];
                }
                limit = 100;
                offset = +req.query.offset || 1;
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, comment_1.default.findAndCountAll({
                        where: {
                            postId: postId,
                        },
                        offset: (offset - 1) * limit,
                        limit: limit,
                    })];
            case 6:
                _a = _b.sent(), count = _a.count, rows = _a.rows;
                total = count;
                comments = rows;
                return [3 /*break*/, 8];
            case 7:
                err_2 = _b.sent();
                error = new Error('Fetching comments failed, please try again later');
                return [2 /*return*/, next(error)];
            case 8:
                res.status(200).json({ total: total, comments: comments });
                return [2 /*return*/];
        }
    });
}); };
var createComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validationError, error, _a, content, authorId, postId, error, correspondingPost, err_3, error, error, newComment, createdComment, err_4, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validationError = express_validator_1.validationResult(req);
                if (!validationError.isEmpty()) {
                    error = new Error('Invalid comment, please check your inputs and try again later');
                    return [2 /*return*/, next(error)];
                }
                _a = req.body, content = _a.content, authorId = _a.authorId, postId = _a.postId;
                if (!input_validator_1.default(content, 'text') ||
                    !input_validator_1.default(authorId, 'id') ||
                    !input_validator_1.default(postId, 'id')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_1.default.findByPk(postId)];
            case 2:
                correspondingPost = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                error = new Error('Create comment failed, please try again later');
                return [2 /*return*/, next(error)];
            case 4:
                if (!correspondingPost) {
                    error = new Error('Invalid values for comment, please try again later');
                    return [2 /*return*/, next(error)];
                }
                newComment = new comment_1.default({
                    content: content,
                    authorId: authorId,
                    postId: postId,
                });
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, newComment.save()];
            case 6:
                createdComment = _b.sent();
                return [3 /*break*/, 8];
            case 7:
                err_4 = _b.sent();
                error = new Error('Could not create comment');
                return [2 /*return*/, next(error)];
            case 8:
                res.status(201).json({
                    commentId: createdComment.dataValues.id,
                    content: createdComment.dataValues.content,
                    authorId: createdComment.dataValues.authorId,
                    postId: createdComment.dataValues.postId,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = { createComment: createComment, getComments: getComments };
