import {Router} from "express"
import * as AuthControl from "../controllers/authController"
import { authMiddleware, rolMiddleware } from "../middleware/AuthMid";
const router=Router(); 

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with their credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Password mismatch or registration error
 *       500:
 *         description: Server error
 */
router.post("/register",AuthControl.register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref : '#/components/schemas/UserLogin'
 *         application/x-www-form-urlencoded:
 *           schema:
 *            $ref : '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

router.post("/login",AuthControl.login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout the user
 *     description: Logs out the current user by invalidating the session.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post("/logout",(_req, res)=>{
    res.send("Logout"); 
})

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Change user password
 *     description: Changes the password of the logged-in user.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Current and new passwords
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - new_password
 *             properties:
 *               password:
 *                 type: string
 *               new_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Error changing password
 *       500:
 *         description: Server error
 */
router.post("/forgot-password",authMiddleware,AuthControl.change_pwd)

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset a user's password
 *     description: Resets the password for a specific user (requires role-based access).
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User information and password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *             properties:
 *               usuario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Error resetting password
 *       500:
 *         description: Server error
 */
router.post("/reset-password",authMiddleware, rolMiddleware,AuthControl.reset_pwd)

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Retrieve the logged-in user's profile
 *     description: Retrieves the profile information of the logged-in user.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile information retrieved successfully
 *       400:
 *         description: Error retrieving profile
 *       500:
 *         description: Server error
 */
router.get("/profile", authMiddleware, AuthControl.profile)



export default router; 