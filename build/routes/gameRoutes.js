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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gameController = __importStar(require("../controllers/gameController"));
const AuthMid_1 = require("../middleware/AuthMid");
const router = (0, express_1.Router)();
router.get("/", gameController.game);
router.get("/get_users", AuthMid_1.authMiddleware, AuthMid_1.rolMiddleware, gameController.litsUsers);
router.get("/history_list", AuthMid_1.authMiddleware, gameController.litsHistory);
router.post("/new_history", AuthMid_1.authMiddleware, gameController.add_new_history);
router.get("/get_history/level/:nivel", AuthMid_1.authMiddleware, gameController.get_historyId);
exports.default = router;
