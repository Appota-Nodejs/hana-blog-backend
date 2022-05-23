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
var crypto_1 = __importDefault(require("crypto"));
var express_validator_1 = require("express-validator");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var eth_sig_util_1 = require("eth-sig-util");
var ethereumjs_util_1 = require("ethereumjs-util");
var user_1 = __importDefault(require("../models/user"));
var input_validator_1 = __importDefault(require("../utils/input-validator"));
var getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error, user, err_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                if (!input_validator_1.default(userId, 'id')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findByPk(userId)];
            case 2:
                user = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                error = new Error('Fetching user failed, please try again later');
                return [2 /*return*/, next(error)];
            case 4:
                if (!user) {
                    res.status(200).json({
                        message: 'Invalid user',
                    });
                }
                res.status(200).json({
                    user: {
                        userId: user.dataValues.id,
                        username: user.dataValues.username,
                        description: user.dataValues.description,
                    },
                });
                return [2 /*return*/];
        }
    });
}); };
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validationError, error, _a, username, password, description, error, existingUser, err_2, error, error, hashedPassword, err_3, error, newUser, createdUser, err_4, error, token, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validationError = express_validator_1.validationResult(req);
                if (!validationError.isEmpty()) {
                    error = new Error('Invalid inputs passed, please check your data');
                    return [2 /*return*/, next(error)];
                }
                _a = req.body, username = _a.username, password = _a.password, description = _a.description;
                if (!input_validator_1.default(username, 'username') ||
                    !input_validator_1.default(password, 'password') ||
                    !input_validator_1.default(description, 'text')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ where: { username: username } })];
            case 2:
                existingUser = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                error = new Error('Registering failed, please try again later');
                return [2 /*return*/, next(error)];
            case 4:
                if (existingUser) {
                    error = new Error('User has already existed');
                    return [2 /*return*/, next(error)];
                }
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
            case 6:
                hashedPassword = _b.sent();
                return [3 /*break*/, 8];
            case 7:
                err_3 = _b.sent();
                error = new Error('Could not create user, please try again later');
                return [2 /*return*/, next(error)];
            case 8:
                newUser = new user_1.default({
                    username: username,
                    password: hashedPassword,
                    description: description,
                });
                _b.label = 9;
            case 9:
                _b.trys.push([9, 11, , 12]);
                return [4 /*yield*/, newUser.save()];
            case 10:
                createdUser = _b.sent();
                return [3 /*break*/, 12];
            case 11:
                err_4 = _b.sent();
                error = new Error('Registering failed, please try again later');
                return [2 /*return*/, next(error)];
            case 12:
                try {
                    token = jsonwebtoken_1.default.sign({
                        userId: createdUser.dataValues.id,
                    }, 'secret-key', { expiresIn: '1h' });
                }
                catch (err) {
                    error = new Error('Registering failed, please try again later');
                    return [2 /*return*/, next(error)];
                }
                res.status(201).json({
                    userId: createdUser.dataValues.id,
                    username: createdUser.dataValues.username,
                    description: createdUser.dataValues.description,
                    token: token,
                });
                return [2 /*return*/];
        }
    });
}); };
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validationError, error, _a, username, password, error, existingUser, err_5, error, error, isValidPassword, err_6, error, error, token, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validationError = express_validator_1.validationResult(req);
                if (!validationError.isEmpty()) {
                    error = new Error('Invalid inputs passed, please check your data');
                    return [2 /*return*/, next(error)];
                }
                _a = req.body, username = _a.username, password = _a.password;
                if (!input_validator_1.default(username, 'username') ||
                    !input_validator_1.default(password, 'password')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ where: { username: username } })];
            case 2:
                existingUser = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_5 = _b.sent();
                error = new Error('Logging in failed, please try again later');
                return [2 /*return*/, next(error)];
            case 4:
                if (!existingUser) {
                    error = new Error('Invalid credentials, could not log you in');
                    return [2 /*return*/, next(error)];
                }
                isValidPassword = false;
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, bcryptjs_1.default.compare(password, existingUser.password)];
            case 6:
                isValidPassword = _b.sent();
                return [3 /*break*/, 8];
            case 7:
                err_6 = _b.sent();
                error = new Error('Could not log you in, please check your credentials and try again');
                return [2 /*return*/, next(error)];
            case 8:
                if (!isValidPassword) {
                    error = new Error('Invalid credentials, could not log you in');
                    return [2 /*return*/, next(error)];
                }
                try {
                    token = jsonwebtoken_1.default.sign({
                        userId: existingUser.id,
                    }, 'secret-key', { expiresIn: '1h' });
                }
                catch (err) {
                    error = new Error('Logging in failed, please try again later');
                    return [2 /*return*/, next(error)];
                }
                res.status(200).json({
                    userId: existingUser.id,
                    username: existingUser.username,
                    description: existingUser.description,
                    token: token,
                });
                return [2 /*return*/];
        }
    });
}); };
var getPublicAddress = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var publicAddress, error, user, err_7, error, hashedPassword, err_8, error, newUser, createdUser, err_9, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                publicAddress = req.params.publicAddress;
                if (!input_validator_1.default(publicAddress, 'key')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ where: { publicAddress: publicAddress } })];
            case 2:
                user = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                error = new Error('Logging in failed, please try again later');
                return [2 /*return*/, next(error)];
            case 4:
                if (user) {
                    res.status(200).json({ nonce: user.nonce });
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, bcryptjs_1.default.hash(crypto_1.default.randomBytes(18).toString('hex'), 12)];
            case 6:
                hashedPassword = _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_8 = _a.sent();
                error = new Error('Could not create user, please try again later');
                return [2 /*return*/, next(error)];
            case 8:
                newUser = new user_1.default({
                    username: publicAddress,
                    password: hashedPassword,
                    description: 'something about yourself',
                    publicAddress: publicAddress,
                });
                _a.label = 9;
            case 9:
                _a.trys.push([9, 11, , 12]);
                return [4 /*yield*/, newUser.save()];
            case 10:
                createdUser = _a.sent();
                return [3 /*break*/, 12];
            case 11:
                err_9 = _a.sent();
                error = new Error('Registering failed, please try again later');
                return [2 /*return*/, next(error)];
            case 12:
                res.status(200).json({ nonce: createdUser.nonce });
                return [2 /*return*/];
        }
    });
}); };
var metamaskLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validationError, error, _a, signature, publicAddress, error, user, err_10, error, error, msg, msgBufferHex, address, error, savedUser, err_11, error, token, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validationError = express_validator_1.validationResult(req);
                if (!validationError.isEmpty()) {
                    error = new Error('Invalid inputs passed, please check your data');
                    return [2 /*return*/, next(error)];
                }
                _a = req.body, signature = _a.signature, publicAddress = _a.publicAddress;
                if (!input_validator_1.default(signature, 'key') || !input_validator_1.default(publicAddress, 'key')) {
                    error = new Error('Invalid inputs, please use valid inputs');
                    return [2 /*return*/, next(error)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ where: { publicAddress: publicAddress } })];
            case 2:
                user = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_10 = _b.sent();
                error = new Error('Logging in failed, please try again later');
                return [2 /*return*/, next(error)];
            case 4:
                if (!user) {
                    error = new Error('User not found');
                    return [2 /*return*/, next(error)];
                }
                msg = "I am signing my one-time nonce: " + user.nonce;
                msgBufferHex = ethereumjs_util_1.bufferToHex(Buffer.from(msg, 'utf8'));
                address = eth_sig_util_1.recoverPersonalSignature({
                    data: msgBufferHex,
                    sig: signature,
                });
                if (address !== publicAddress) {
                    error = new Error('Signature verification failed');
                    return [2 /*return*/, next(error)];
                }
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                user.nonce = Math.floor(Math.random() * 10000);
                return [4 /*yield*/, user.save()];
            case 6:
                savedUser = _b.sent();
                return [3 /*break*/, 8];
            case 7:
                err_11 = _b.sent();
                error = new Error('Logging in failed, please try again later');
                return [2 /*return*/, next(error)];
            case 8:
                try {
                    token = jsonwebtoken_1.default.sign({
                        userId: savedUser.id,
                    }, 'secret-key', { expiresIn: '1h' });
                }
                catch (err) {
                    error = new Error('Logging in failed, please try again later');
                    return [2 /*return*/, next(error)];
                }
                res.status(200).json({
                    userId: savedUser.id,
                    publicAddress: savedUser.publicAddress,
                    username: savedUser.username,
                    description: savedUser.description,
                    token: token,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = { getUser: getUser, register: register, login: login, metamaskLogin: metamaskLogin, getPublicAddress: getPublicAddress };
