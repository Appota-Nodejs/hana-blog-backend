"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var post_controller_1 = require("../controllers/post-controller");
var comment_controllers_1 = __importDefault(require("../controllers/comment-controllers"));
var check_auth_1 = __importDefault(require("../middlewares/check-auth"));
var router = express_1.default.Router();
// Post Routes
router.get('/', post_controller_1.posts);
router.get('/:id', post_controller_1.getOne);
router.post('/', check_auth_1.default, [
    express_validator_1.check('content').not().isEmpty().trim(),
    express_validator_1.check('title').not().isEmpty().trim(),
], post_controller_1.create);
router.put('/:id', check_auth_1.default, [
    express_validator_1.check('content').not().isEmpty().trim(),
    express_validator_1.check('title').not().isEmpty().trim(),
], post_controller_1.update);
router.delete('/:id', check_auth_1.default, post_controller_1.destroy);
// Comment Routes
router.get('/:postId/comments', comment_controllers_1.default.getComments);
router.use(check_auth_1.default);
router.post('/:postId/comments', [
    express_validator_1.check('content').not().isEmpty().trim(),
    express_validator_1.check('authorId').not().isEmpty().trim().escape(),
    express_validator_1.check('postId').not().isEmpty().trim().escape(),
], comment_controllers_1.default.createComment);
exports.default = router;
