import { Request, Response } from 'express';
import * as AuthService from '../services/authService';



interface RequestLogin extends Request{
    usuario?:string
    userId?:string 
}


export const login = async (req: RequestLogin, res: Response) => {
try {    
    //console.log(req.usuario);
    
    const { usuario, password } = req.body;
    const token = await AuthService.login(usuario, password);
    if(token){
      res.status(200).json({token}); 
    }else {
      res.status(400).json({message:"Error en credenciales"})
    } 
} catch (error) {
    if(error instanceof Error){

        res.status(500).json({message:error.message})
    }else {
        res.status(500).json({message:"No se sabe el error"})
    }
}
};

export const register=async (req:Request, res: Response)=>{
    try {
        const { password, password1} = req.body; 
        console.log(req.body);
        
        if(password!=password1)
            throw new Error("Error  de constraseña verifica");
        const token= await AuthService.register(req.body); 
    
        if(token){
            res.status(200).json({token}); 
        }else {
            res.status(400).json({message:"Error en registro "})
        }
        
    } catch (error) {
        if(error instanceof Error){

            res.status(500).json({message:error.message})
        }else {
            res.status(500).json({message:"No se sabe el error"})
        }
    }
}



export const reset_pwd=async (req:Request, res: Response)=>{
    try {
        const { usuario} = req.body; 
        if(usuario){
            const procesado = await AuthService.reset_pass(usuario); 
        
            if(procesado){
                res.status(200).json({ok:true, message:"Se  reseteo la contraseña"}); 
            }else {
                res.status(400).json({ok:false, message:"Error en reseteo de la contraseña "})
            }

        }else {

            throw new Error("Error   en usuario  verificar");
        }
        
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }else {
            res.status(500).json({message:"No se sabe el error"})
        }
    }
}



export const profile =async (req:any, res:Response )=>{
    
    try {        
        
        if(!req.userId)
            throw new Error("No hay el usuario en el sistema ");
            
        const  info = await  AuthService.getUser(req.userId);             
        res.status(200).json(info); 

    } catch (error) {
        if(error instanceof Error ){
            res.status(400).json({massage:error.message})            
        }else {
            res.status(500).json({message:"Error del seridor"})
        }
    }



    
}

export const change_pwd = async (req:any, res:Response)=>{

    try {
        
         const id = req.userId; 
         const {password,new_password}=req.body; 
         if(id && password && new_password){
              const response=await  AuthService.UpsatePasswd(id,password, new_password); 

              if(response.ok){
                //res.status(204).json({message:"Se actualizo la contraseña Ok "}) No envia mensage 
                res.status(200).json({message:"Se actualizo la contraseña Ok "})
              }else {
                res.status(400).json({message:"No se pudo actualizar la contraseña, verifica!"})
              }
         }else {
            res.status(400).json({message:"No hay suficientes datos  , para el combio de la contraseña"})
         }

    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }else {
            res.status(500).json({message:"Error desconosido"})
        }
    }


}