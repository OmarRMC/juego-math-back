
import mongoose  from "mongoose"
const userSchema = new mongoose.Schema({
    usuario:String, 
    nombre:String, 
    apellido:String, 
    password: String ,     
    level: Number, // Nivel actual del usuario
    score: Number, // Puntuación total del usuario    
    rol:Number , 
    bestScoreLevel:[Number]
});


export  const  userModel = mongoose.model("users",userSchema)