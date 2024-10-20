"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("./swagger/schemas");
const swagger_1 = __importDefault(require("./swagger/swagger"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const database_1 = __importDefault(require("./config/database"));
const AuthMid_1 = require("./middleware/AuthMid");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api-docs", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
const PORT = process.env.PORT || 3000;
(0, database_1.default)();
/*
app.get("/", (_req, res)=>{
    res.send({message:"welcome", info:"/api-docs"});
})*/
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "main.html"));
});
app.use("/api/game", AuthMid_1.authMiddleware);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/game", gameRoutes_1.default);
app.listen(PORT, () => {
    console.log("Server en el puerto : " + PORT);
});
