"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.change_pwd = exports.profile = exports.reset_pwd = exports.register = exports.login = void 0;
const AuthService = __importStar(require("../services/authService"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.usuario);
        const { usuario, password } = req.body;
        const token = yield AuthService.login(usuario, password);
        if (token) {
            res.status(200).json({ token });
        }
        else {
            res.status(400).json({ message: "Error en credenciales" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "No se sabe el error" });
        }
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, password1 } = req.body;
        console.log(req.body);
        if (password != password1)
            throw new Error("Error  de constraseña verifica");
        const token = yield AuthService.register(req.body);
        if (token) {
            res.status(200).json({ token });
        }
        else {
            res.status(400).json({ message: "Error en registro " });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "No se sabe el error" });
        }
    }
});
exports.register = register;
const reset_pwd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario } = req.body;
        if (usuario) {
            const procesado = yield AuthService.reset_pass(usuario);
            if (procesado) {
                res.status(200).json({ ok: true, message: "Se  reseteo la contraseña" });
            }
            else {
                res.status(400).json({ ok: false, message: "Error en reseteo de la contraseña " });
            }
        }
        else {
            throw new Error("Error   en usuario  verificar");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "No se sabe el error" });
        }
    }
});
exports.reset_pwd = reset_pwd;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId)
            throw new Error("No hay el usuario en el sistema ");
        const info = yield AuthService.getUser(req.userId);
        res.status(200).json(info);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ massage: error.message });
        }
        else {
            res.status(500).json({ message: "Error del seridor" });
        }
    }
});
exports.profile = profile;
const change_pwd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const { password, new_password } = req.body;
        if (id && password && new_password) {
            const response = yield AuthService.UpsatePasswd(id, password, new_password);
            if (response.ok) {
                //res.status(204).json({message:"Se actualizo la contraseña Ok "}) No envia mensage 
                res.status(200).json({ message: "Se actualizo la contraseña Ok " });
            }
            else {
                res.status(400).json({ message: "No se pudo actualizar la contraseña, verifica!" });
            }
        }
        else {
            res.status(400).json({ message: "No hay suficientes datos  , para el combio de la contraseña" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Error desconosido" });
        }
    }
});
exports.change_pwd = change_pwd;
