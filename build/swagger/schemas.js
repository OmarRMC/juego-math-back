"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - usuario
 *         - nombre
 *         - apellido
 *         - password
 *         - password1
 *       properties:
 *         usuario:
 *           type: string
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         password:
 *           type: string
 *         password1:
 *           type: string
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - usuario
 *         - password
 *       properties:
 *         usuario:
 *           type: string
 *         password:
 *           type: string
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     newHistory:
 *       type: object
 *       required:
 *         - score
 *         - level
 *         - duration
 *       properties:
 *         score:
 *           type: number
 *         level:
 *           type: number
 *         duration:
 *           type: string
 */
