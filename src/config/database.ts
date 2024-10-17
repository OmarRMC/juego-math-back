import mongoose from 'mongoose';
const connectDB = async () => {
    const url = process.env.DB_CONFIG||""
    console.log(url);    
    try {
        await mongoose.connect(url);
        console.log("Se conecto Ok DB");        
    } catch (error) {
        if(error instanceof Error)
        {
            console.log(error.message);
        }else {
            console.log("Error en conexion");
            
        }
        
    }
};
export default connectDB;
