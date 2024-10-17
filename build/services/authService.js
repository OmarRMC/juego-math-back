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
exports.UpsatePasswd = exports.getUser = exports.reset_pass = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const user_1 = require("../models/user");
const bcrypt_1 = require("../config/bcrypt");
const login = (_user, _password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(jwt_1.jwtSecret);
    if (!jwt_1.jwtSecret)
        throw new Error("JWT no esta definido el secret ");
    const userDB = yield user_1.userModel.find({ usuario: _user });
    console.log(userDB[0]);
    if (userDB.length == 0)
        throw new Error("No hay usuario en DB ");
    let pw = "";
    if (userDB[0].password)
        pw = userDB[0].password;
    const isPasswdValid = yield bcryptjs_1.default.compare(_password, pw);
    if (!isPasswdValid)
        throw new Error("Invalido en los credenciales");
    const token = jsonwebtoken_1.default.sign({ id: userDB[0]._id, user: userDB[0].usuario, rol: userDB[0].rol }, jwt_1.jwtSecret, { expiresIn: jwt_1.jwtExpiration });
    return token;
});
exports.login = login;
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const exits = yield user_1.userModel.exists({ usuario: user.usuario });
    if (exits)
        throw new Error("Existe el usuario");
    let { password } = user;
    password = yield (0, bcrypt_1.encriptar)(password);
    user.password = password;
    const dato = new user_1.userModel(Object.assign(Object.assign({}, user), { level: 1, score: 0, rol: 0, bestScoreLevel: [0, 0, 0, 0] }));
    yield dato.save();
    const token = jsonwebtoken_1.default.sign({ id: dato._id, user: user.usuario, rol: 0 }, jwt_1.jwtSecret, { expiresIn: jwt_1.jwtExpiration });
    return token;
});
exports.register = register;
const reset_pass = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const passNew = yield (0, bcrypt_1.encriptar)(user);
    const res = yield user_1.userModel.updateOne({ usuario: user }, { password: passNew });
    return res.modifiedCount > 0;
});
exports.reset_pass = reset_pass;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let userDB = yield user_1.userModel.findById(id);
    console.log(userDB);
    if (userDB) {
        let { usuario, nombre, apellido, level, score, rol, bestScoreLevel } = userDB;
        if (!usuario)
            usuario = "";
        if (!nombre)
            nombre = "";
        if (!apellido)
            apellido = "";
        if (!bestScoreLevel)
            bestScoreLevel = [0, 0, 0, 0];
        if (typeof level != "number")
            level = 0;
        if (typeof score != "number")
            score = 0;
        if (typeof rol != "number")
            rol = 0;
        return {
            usuario,
            nombre,
            apellido,
            level,
            score,
            rol,
            bestScoreLevel
        };
    }
    else {
        throw new Error("Error en optener los datos del usuario");
    }
});
exports.getUser = getUser;
const UpsatePasswd = (id, password, _new_password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new Error("Error en usuario");
    const userDB = yield user_1.userModel.findById(id);
    if (userDB) {
        const pass = userDB.password;
        if (pass) {
            const check = yield (0, bcrypt_1.Verificar)(password, pass);
            if (check) {
                const new_pass_encriptado = yield (0, bcrypt_1.encriptar)(_new_password);
                const res_query = yield user_1.userModel.findByIdAndUpdate(id, { password: new_pass_encriptado });
                if (res_query) {
                    return { ok: true };
                }
                else {
                    return { ok: false };
                }
            }
        }
    }
    console.log(userDB);
    return { ok: false };
});
exports.UpsatePasswd = UpsatePasswd;
