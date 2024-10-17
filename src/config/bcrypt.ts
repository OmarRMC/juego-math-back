import bcrypt from 'bcryptjs';

const saltos=Number(process.env.BCRY_SALTOS)||1
export const encriptar= async (passwd:string)=>{    
    try {
        const hash = await bcrypt.hash(passwd,saltos); 
        return hash; 
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message);        
        }else {
            throw new Error("Error en Encriptar ");            
        }
    }
}

export const Verificar= async (pass1:string , pass2_hash:string )=>{
    try {
      const  check = await bcrypt.compare(pass1, pass2_hash)
      return check; 
    } catch (error) {
        throw new Error("Error en la contraseña ");
        
    }
}