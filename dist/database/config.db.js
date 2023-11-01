"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_CNN ?? '');
        console.log('[DB_CONNECTION] Base de datos conectada');
    }
    catch (error) {
        console.log('[DB_CONNECTION]', error);
        throw new Error('[DB_CONNECTION] Error al inicializar la base de datos');
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.db.js.map