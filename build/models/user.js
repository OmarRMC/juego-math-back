"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    usuario: String,
    nombre: String,
    apellido: String,
    password: String,
    level: Number, // Nivel actual del usuario
    score: Number, // Puntuación total del usuario    
    rol: Number,
    bestScoreLevel: [Number]
});
exports.userModel = mongoose_1.default.model("users", userSchema);
