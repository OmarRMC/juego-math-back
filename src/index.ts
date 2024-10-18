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


const app= express() 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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