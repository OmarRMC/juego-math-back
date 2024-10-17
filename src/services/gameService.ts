
import { historyModel } from "../models/game"
import { userModel } from "../models/user"
import { historyType, UserGet } from "../types"




export const getUser = async (id: string | undefined): Promise<UserGet | undefined> => {

    let UserDB = await userModel.findById(id)

    if (UserDB) {        
        return verifyTypeUserGet(UserDB)
    } else {
        return undefined;
    }
}
export const getUsers = async (): Promise<UserGet[] | undefined> => {
    let UserDB = await userModel.find()
    const datos = UserDB.map((e) => {
        return verifyTypeUserGet(e)
    }
    )

    return datos;
}

function verifyTypeUserGet(e:any):UserGet{
    let { usuario, nombre, apellido, level, score, rol, bestScoreLevel } = e
    if (!usuario) usuario = ""
    if (!nombre) nombre = ""
    if (!apellido) apellido = ""
    if (!bestScoreLevel) bestScoreLevel = [0, 0, 0, 0]
    if (typeof level != "number") level = 0;
    if (typeof score != "number") score = 0;
    if (typeof rol != "number") rol = 0;
    return { usuario, nombre, apellido, level, score, rol, bestScoreLevel };
}

export const lista_historys = async (userId: string): Promise<historyType[] | undefined> => {
    const listaHistory = await historyModel.find({ userId })
    const lista = listaHistory.map((e) => {
        let { id, userId,
            score,
            date,
            level,
            duration } = e;

        if (!userId) userId = "";
        if (!score) score = 0;
        if (!level) level = 0;
        if (!duration) duration = 0;
        if (!date) date = new Date();

        return {
            id, userId,
            score,
            date,
            level,
            duration
        }
    })
    if (lista)
        return lista

    return undefined
}

export const add_history = async (userId: string, score: number, nivel: number, duration: number) => {

    try {
        const date = new Date();
        const newHistoty = new historyModel({
            userId,
            score,
            date,
            level:nivel,
            duration
        })
        newHistoty.save();
        let userDB = await userModel.findById(userId); 
        if(userDB){
            let {bestScoreLevel, level } = userDB; 
            if(score>bestScoreLevel[nivel-1]){
                if(nivel==level && level<4 && score>50){
                    level++; 
                }
                bestScoreLevel[nivel-1]=score
                const suma= bestScoreLevel.reduce((s, valorActual)=> s + valorActual,0)
                const promedio=suma/bestScoreLevel.length; 
                //const posicion:string="bestScoreLevel."+(nivel-1)
                const responseUpsate= await userModel.findByIdAndUpdate(userId,{$set:{bestScoreLevel}, score:promedio.toFixed(3), level}); 
                if(!responseUpsate){
                    throw new Error("No se pudo actualizar el Usuario");                    
                }
            }
        }
    /*
        if (score > 50 && level < 4) {
            const userDB = await userModel.updateMany({ _id: userId, level: level }, { $inc: { level: 1 }, score })
            if (userDB.modifiedCount = 0) {
                throw new Error("Errror en actualizar al usuario");
            }
        } else {
            const userDB = await userModel.updateMany({ _id: userId }, { score })
            if (userDB.modifiedCount = 0) {
                throw new Error("Errror en actualizar al usuario");
            }
        }*/
    } catch (error) {
        throw new Error("No se pudo adicionar al historial ");

    }

}

export const get_history = async (nivel: number, userId: string) => {
    const listaHistory = await historyModel.find({ level: nivel, userId })
    return listaHistory;
}