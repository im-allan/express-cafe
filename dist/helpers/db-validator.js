"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existUserById = exports.existEmail = exports.isValidRole = void 0;
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const isValidRole = async (role) => {
    const existRole = await role_1.default.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
};
exports.isValidRole = isValidRole;
const existEmail = async (email) => {
    const existEmail = await user_1.default.findOne({ email });
    if (existEmail) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
};
exports.existEmail = existEmail;
const existUserById = async (id) => {
    const existUser = await user_1.default.findById(id);
    if (!existUser) {
        throw new Error(`No existe un usuario con el id ${id}`);
    }
};
exports.existUserById = existUserById;
//# sourceMappingURL=db-validator.js.map