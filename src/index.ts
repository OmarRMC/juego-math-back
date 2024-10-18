import dotenv from 'dotenv';
dotenv.config();

import express from "express"

import cors from "cors"

import swaggerUI from "swagger-ui-express";

import  "./swagger/schemas"
import specs from "./swagger/swagger";

import diaryRouter  from "./routes/diares"

import authRouter from "./routes/authRoutes"
import gameRouter from "./routes/gameRoutes"

import connectDB from "./config/database"
import {authMiddleware} from './middleware/AuthMid';

const swaggerUiUrl = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.51.0/swagger-ui-bundle.js';
const swaggerUiStandalonePresetUrl = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.51.0/swagger-ui-standalone-preset.js';
//const _swaggerUiCssUrl = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.51.0/swagger-ui.css';



const app= express() 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, {
    swaggerOptions: {
        url: swaggerUiUrl, // Cambia esto a la URL del bundle
        kiuri: swaggerUiStandalonePresetUrl, // Cambia esto a la URL del standalone preset
        dom_id: '#swagger-ui',
    },
}));

const  PORT= process.env.PORT||3000 
connectDB(); 

app.get("/ping", (_req, res)=>{
    console.log("Hola ");    
    res.send("Hola Mundo"); 
})

app.use("/api/game", authMiddleware);

app.use("/api/diaries", diaryRouter)
app.use("/api/auth", authRouter)

app.use("/api/game",gameRouter)


app.listen(PORT , ()=>{
    console.log("Server en el puerto : "+PORT);    
})