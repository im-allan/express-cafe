"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDelete = exports.usersPut = exports.usersPost = exports.usersGet = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const usersGet = async (req, res) => {
    const { limit = 5, skip = 0 } = req.query;
    const [total, users] = await Promise.all([
        user_1.default.countDocuments({ status: true }),
        user_1.default.find({ status: true })
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
    res.json({
        total,
        users
    });
};
exports.usersGet = usersGet;
const usersPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new user_1.default({ name, email, password, role });
    // Encriptar password
    const salt = bcrypt_1.default.genSaltSync();
    user.password = bcrypt_1.default.hashSync(password, salt);
    // Guardar en BD
    await user.save();
    res.status(201).json({
        user
    });
};
exports.usersPost = usersPost;
const usersPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;
    if (password) {
        const salt = bcrypt_1.default.genSaltSync();
        rest.password = bcrypt_1.default.hashSync(password, salt);
    }
    const user = await user_1.default.findByIdAndUpdate(id, rest);
    res.status(200).json(user);
};
exports.usersPut = usersPut;
const usersDelete = async (req, res) => {
    const { id } = req.params;
    const user = await user_1.default.findByIdAndUpdate(id, { status: false });
    res.json(user);
};
exports.usersDelete = usersDelete;
//# sourceMappingURL=users.controller.js.map