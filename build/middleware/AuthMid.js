"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
/*interface CustomRequest extends Request {
    userId?: string
    user?:string   // O el tipo adecuado según tu aplicación
}*/
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).send('No token provided.');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.jwtSecret);
        req.userId = decoded.id; // Aquí necesitas asegurarte de que req tenga el tipo correcto
        req.usuario = decoded.user; // Aquí necesitas asegurarte de que req tenga el tipo correcto
        req.rol = decoded.rol;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
exports.authMiddleware = authMiddleware;
const rolMiddleware = (req, res, next) => {
    try {
        console.log(req.rol);
        if (Number(req.rol) == 1) {
            next();
        }
        else {
            res.status(403).json({ message: "Ne se tiene suficientes  permisos" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error en el serivdor" });
    }
};
exports.rolMiddleware = rolMiddleware;
