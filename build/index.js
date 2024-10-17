"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diares_1 = __importDefault(require("./routes/diares"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const database_1 = __importDefault(require("./config/database"));
const AuthMid_1 = require("./middleware/AuthMid");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
(0, database_1.default)();
app.get("/ping", (_req, res) => {
    console.log("Hola ");
    res.send("Hola Mundo");
});
app.use("/api/game", AuthMid_1.authMiddleware);
app.use("/api/diaries", diares_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/game", gameRoutes_1.default);
app.listen(PORT, () => {
    console.log("Server en el puerto : " + PORT);
});
