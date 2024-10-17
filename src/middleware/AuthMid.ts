import { /*Request,*/ Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwt';

/*interface CustomRequest extends Request {
    userId?: string
    user?:string   // O el tipo adecuado según tu aplicación
}*/
  const authMiddleware = (req: any, res: any, next: NextFunction) => {
   const token = req.headers['authorization'];
    if (!token) return res.status(403).send('No token provided.');
  
    try {
      const decoded = jwt.verify(token, jwtSecret) as { id: string; user: string , rol:number };
      req.userId = decoded.id; // Aquí necesitas asegurarte de que req tenga el tipo correcto
      req.usuario = decoded.user; // Aquí necesitas asegurarte de que req tenga el tipo correcto
      req.rol=decoded.rol
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }  
  };


  const rolMiddleware=(req:any, res:Response, next:NextFunction)=>{
    try {
      console.log(req.rol);
      
      if(Number(req.rol)==1){
        next(); 
      }else {
        res.status(403).json({message:"Ne se tiene suficientes  permisos"})
      }

    } catch (error) {
      res.status(500).json({message:"Error en el serivdor"})
    }

  }
export  {authMiddleware, rolMiddleware};
