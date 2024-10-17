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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verificar = exports.encriptar = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltos = Number(process.env.BCRY_SALTOS) || 1;
const encriptar = (passwd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcryptjs_1.default.hash(passwd, saltos);
        return hash;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error("Error en Encriptar ");
        }
    }
});
exports.encriptar = encriptar;
const Verificar = (pass1, pass2_hash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield bcryptjs_1.default.compare(pass1, pass2_hash);
        return check;
    }
    catch (error) {
        throw new Error("Error en la contraseña ");
    }
});
exports.Verificar = Verificar;
