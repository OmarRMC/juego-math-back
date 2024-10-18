"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api del juego  math - backend',
            version: '1.0.0',
            description: ' Esto es una api ',
            contact: {
                name: 'Omar R Mamani Capcha'
            },
        },
        servers: [
            {
                /*url: 'http://localhost:3000',*/
                url: 'https://juego-math-back.vercel.app/api-docs',
                description: 'Server vercel'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'authorization',
                    description: 'Ingresa el token , solo el codigo'
                    /* Si quieres inviar tal como es bearer codeToken
                     type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',  // Usa JWT o Token según prefieras
                    */
                },
            },
        },
        /* Se aplica para todas la rutas la seguridad
        security: [
          {
            bearerAuth: [],  // Esto indica que en las rutas se espera el token en los headers
          },
        ],*/
    },
    apis: ['./src/routes/*.ts', './src/swagger/schemas.ts']
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;
