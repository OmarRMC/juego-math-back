"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const historySchema = new mongoose_1.default.Schema({
    userId: String,
    score: Number,
    date: Date,
    level: Number,
    duration: Number,
});
exports.historyModel = mongoose_1.default.model("history", historySchema);
