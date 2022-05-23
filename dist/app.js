"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
// import xss from 'xss-clean';
var dotenv_1 = __importDefault(require("dotenv"));
var database_1 = __importDefault(require("./utils/database"));
var user_1 = __importDefault(require("./models/user"));
var post_1 = __importDefault(require("./models/post"));
var comment_1 = __importDefault(require("./models/comment"));
var user_routes_1 = __importDefault(require("./routes/user-routes"));
var post_routes_1 = __importDefault(require("./routes/post-routes"));
var not_found_1 = __importDefault(require("./controllers/not-found"));
dotenv_1.default.config();
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(helmet_1.default());
// app.use(xss());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use('/api/users', user_routes_1.default);
app.use('/api/posts', post_routes_1.default);
app.use(not_found_1.default);
app.use(function (error, req, res, next) {
    res.status(500).json({ message: error.message || 'An error occurred!' });
});
post_1.default.belongsTo(user_1.default, { foreignKey: 'authorId', onDelete: 'CASCADE' });
user_1.default.hasMany(post_1.default, { foreignKey: 'authorId' });
comment_1.default.belongsTo(user_1.default, { foreignKey: 'authorId', onDelete: 'CASCADE' });
user_1.default.hasMany(comment_1.default, { foreignKey: 'authorId' });
comment_1.default.belongsTo(post_1.default, { foreignKey: 'postId', onDelete: 'CASCADE' });
post_1.default.hasMany(comment_1.default, { foreignKey: 'postId' });
database_1.default
    .sync({ alter: true })
    .then(function (result) {
    app.listen(process.env.PORT || 8000);
})
    .catch(function (err) {
    console.log(err);
});
