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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_history = exports.add_history = exports.lista_historys = exports.getUsers = exports.getUser = void 0;
const game_1 = require("../models/game");
const user_1 = require("../models/user");
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let UserDB = yield user_1.userModel.findById(id);
    if (UserDB) {
        return verifyTypeUserGet(UserDB);
    }
    else {
        return undefined;
    }
});
exports.getUser = getUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let UserDB = yield user_1.userModel.find();
    const datos = UserDB.map((e) => {
        return verifyTypeUserGet(e);
    });
    return datos;
});
exports.getUsers = getUsers;
function verifyTypeUserGet(e) {
    let { usuario, nombre, apellido, level, score, rol, bestScoreLevel } = e;
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
    return { usuario, nombre, apellido, level, score, rol, bestScoreLevel };
}
const lista_historys = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const listaHistory = yield game_1.historyModel.find({ userId });
    const lista = listaHistory.map((e) => {
        let { id, userId, score, date, level, duration } = e;
        if (!userId)
            userId = "";
        if (!score)
            score = 0;
        if (!level)
            level = 0;
        if (!duration)
            duration = 0;
        if (!date)
            date = new Date();
        return {
            id, userId,
            score,
            date,
            level,
            duration
        };
    });
    if (lista)
        return lista;
    return undefined;
});
exports.lista_historys = lista_historys;
const add_history = (userId, score, nivel, duration) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const newHistoty = new game_1.historyModel({
            userId,
            score,
            date,
            level: nivel,
            duration
        });
        newHistoty.save();
        let userDB = yield user_1.userModel.findById(userId);
        if (userDB) {
            let { bestScoreLevel, level } = userDB;
            if (score > bestScoreLevel[nivel - 1]) {
                if (nivel == level && level < 4 && score > 50) {
                    level++;
                }
                bestScoreLevel[nivel - 1] = score;
                const suma = bestScoreLevel.reduce((s, valorActual) => s + valorActual, 0);
                const promedio = suma / bestScoreLevel.length;
                //const posicion:string="bestScoreLevel."+(nivel-1)
                const responseUpsate = yield user_1.userModel.findByIdAndUpdate(userId, { $set: { bestScoreLevel }, score: promedio.toFixed(3), level });
                if (!responseUpsate) {
                    throw new Error("No se pudo actualizar el Usuario");
                }
            }
        }
        /*
            if (score > 50 && level < 4) {
                const userDB = await userModel.updateMany({ _id: userId, level: level }, { $inc: { level: 1 }, score })
                if (userDB.modifiedCount = 0) {
                    throw new Error("Errror en actualizar al usuario");
                }
            } else {
                const userDB = await userModel.updateMany({ _id: userId }, { score })
                if (userDB.modifiedCount = 0) {
                    throw new Error("Errror en actualizar al usuario");
                }
            }*/
    }
    catch (error) {
        throw new Error("No se pudo adicionar al historial ");
    }
});
exports.add_history = add_history;
const get_history = (nivel, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const listaHistory = yield game_1.historyModel.find({ level: nivel, userId });
    return listaHistory;
});
exports.get_history = get_history;
