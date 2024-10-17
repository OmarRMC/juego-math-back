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
exports.get_historyId = exports.add_new_history = exports.litsHistory = exports.litsUsers = exports.game = void 0;
const gameService_1 = require("../services/gameService");
const game = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId || !req.usuario) {
            throw new Error("Error en optener el usuario en game ");
        }
        const user = yield (0, gameService_1.getUser)(req.userId);
        res.status(200).json(user);
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
exports.game = game;
const litsUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let datos = [];
    if (typeof req.rol == "number")
        datos = yield (0, gameService_1.getUsers)();
    res.status(200).json(datos);
});
exports.litsUsers = litsUsers;
const litsHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.userId);
    const lista = yield (0, gameService_1.lista_historys)(req.userId);
    res.status(200).json(lista);
});
exports.litsHistory = litsHistory;
const add_new_history = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { score, level, duration } = req.body;
        if (req.userId)
            yield (0, gameService_1.add_history)(req.userId, score, level, duration);
        res.status(201).send("Se adicino un nuevo historial");
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send("Error No se sabe ");
        }
    }
});
exports.add_new_history = add_new_history;
const get_historyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nivel = Number(req.params.nivel);
    const userId = req.userId;
    if (nivel >= 0 && userId) {
        const listaHistory = yield (0, gameService_1.get_history)(nivel, userId);
        res.status(200).json(listaHistory);
    }
    else {
        res.status(404).send("No se encontro el usuario");
    }
});
exports.get_historyId = get_historyId;
