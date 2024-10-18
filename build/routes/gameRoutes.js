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
/**
 * @swagger
 * /api/game/:
 *   get:
 *     summary: Game homepage
 *     description: Fetches the main game information for the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Game
 *     responses:
 *       200:
 *         description: Game data retrieved successfully
 *       403:
 *         description: Invalid token or permissions
 *       500:
 *         description: Server error
 */
router.get("/", gameController.game);
/**
 * @swagger
 * /api/game/get_users:
 *   get:
 *     summary: List all users
 *     description: Retrieves a list of all users with administrative access.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       403:
 *         description: Insufficient permissions
 *       500:
 *         description: Server error
 */
router.get("/get_users", AuthMid_1.authMiddleware, AuthMid_1.rolMiddleware, gameController.litsUsers);
/**
 * @swagger
 * /api/game/history_list:
 *   get:
 *     summary: Get user history
 *     description: Retrieves the history for the logged-in user.
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *       403:
 *         description: Invalid token or permissions
 *       500:
 *         description: Server error
 */
router.get("/history_list", AuthMid_1.authMiddleware, gameController.litsHistory);
/**
 * @swagger
 * /api/game/new_history:
 *   post:
 *     summary: Add a new game history entry
 *     description: Adds a new history entry for the logged-in user.
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Game history details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref:  '#/components/schemas/newHistory'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref:  '#/components/schemas/newHistory'
 *     responses:
 *       201:
 *         description: New history added
 *       403:
 *         description: Invalid token or permissions
 *       500:
 *         description: Server error
 */
router.post("/new_history", AuthMid_1.authMiddleware, gameController.add_new_history);
/**
 * @swagger
 * /api/game/get_history/level/{nivel}:
 *   get:
 *     summary: Get game history by level
 *     description: Retrieves the history entries of a specific level for the logged-in user.
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nivel
 *         required: true
 *         schema:
 *           type: integer
 *         description: The level to retrieve the history for.
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *       404:
 *         description: No history found for this user at the specified level
 *       403:
 *         description: Invalid token or permissions
 *       500:
 *         description: Server error
 */
router.get("/get_history/level/:nivel", AuthMid_1.authMiddleware, gameController.get_historyId);
exports.default = router;
