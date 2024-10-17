
import bcrypt from 'bcryptjs';
import { UserGet, UserInfo } from "../types"

import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiration } from '../config/jwt';

import { userModel } from '../models/user';
import { encriptar, Verificar } from '../config/bcrypt';


export const login = async (_user: string, _password: string): Promise<string | null> => {
    console.log(jwtSecret);

    if (!jwtSecret)
        throw new Error("JWT no esta definido el secret ");

    const userDB = await userModel.find({ usuario: _user });
    console.log(userDB[0]);

    if (userDB.length == 0)
        throw new Error("No hay usuario en DB ");

    let pw = "";
    if (userDB[0].password)
        pw = userDB[0].password;



    const isPasswdValid = await bcrypt.compare(_password, pw);


    if (!isPasswdValid)
        throw new Error("Invalido en los credenciales");

    const token = jwt.sign(
        { id: userDB[0]._id, user: userDB[0].usuario, rol: userDB[0].rol }, jwtSecret,
        { expiresIn: jwtExpiration }
    );

    return token
}



export const register = async (user: UserInfo): Promise<string | null> => {
    const exits = await userModel.exists({ usuario: user.usuario })
    if (exits)
        throw new Error("Existe el usuario");

    let { password } = user;
    password = await encriptar(password)
    user.password = password
    const dato = new userModel({ ...user, level: 1, score: 0, rol: 0, bestScoreLevel:[0,0,0,0] })
    await dato.save();

    const token = jwt.sign(
        { id: dato._id, user: user.usuario, rol: 0 }, jwtSecret,
        { expiresIn: jwtExpiration }
    );

    return token
}



export const reset_pass = async (user: string): Promise<boolean> => {
    const passNew: string = await encriptar(user)
    const res = await userModel.updateOne({ usuario: user }, { password: passNew });
    return res.modifiedCount > 0;
}


export const getUser = async (id: string): Promise<UserGet | undefined> => {
    let userDB = await userModel.findById(id)

    console.log(userDB);
    if(userDB){
        let { usuario,nombre,apellido,level,score,rol, bestScoreLevel } = userDB
        if (!usuario) usuario = ""
        if (!nombre) nombre = ""
        if (!apellido) apellido = ""
        if(!bestScoreLevel) bestScoreLevel=[0,0,0,0]
        if (typeof level != "number") level = 0
        if (typeof score != "number") score = 0
        if (typeof rol != "number") rol = 0
        return {
            usuario,
            nombre,
            apellido,
            level,
            score,
            rol, 
            bestScoreLevel
        }
    }else {
            throw new Error("Error en optener los datos del usuario");
            
    }
   
}


export const UpsatePasswd=async (id:string , password:string, _new_password:string ):Promise<{ok:boolean}>=>{

    if(!id) throw new Error("Error en usuario");
    
    const userDB =  await  userModel.findById(id)
    if(userDB){
         const pass=userDB.password; 
         if(pass){
            const check= await Verificar( password, pass); 
            if(check){
                const new_pass_encriptado= await encriptar(_new_password); 
                const res_query= await userModel.findByIdAndUpdate(id, {password:new_pass_encriptado})
                if(res_query){
                   return {ok:true}
                }else {
                    return {ok:false }
                }
            }
         }
    }
    console.log(userDB); 
    return {ok:false }

}