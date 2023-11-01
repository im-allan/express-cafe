"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_db_1 = require("../database/config.db");
const cors = require('cors');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        // Conectar a bd
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }
    async connectDB() {
        await (0, config_db_1.dbConnection)();
    }
    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Directorio público
        this.app.use(express_1.default.static('../public'));
    }
    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}!\n`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map