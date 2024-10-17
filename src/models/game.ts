  

import mongoose  from "mongoose"
const historySchema = new mongoose.Schema({    
        userId: String,
        score: Number, 
        date: Date, 
        level: Number, 
        duration: Number,
});


export  const  historyModel = mongoose.model("history",historySchema)