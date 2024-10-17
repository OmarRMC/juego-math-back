//export type Weather = "sunny"|"rainy"|"cloudy"|"windy"|"stormy"
//export type Visibility="great"|"good"|"ok"|"poor"
//import { Request} from "express"


export enum Visibility{
    great="great", 
    good="good", 
    ok="ok", 
    poor="poor"
}
export enum Weather{
    sunny="sunny", 
    rainy="rainy",
    cloudy="cloudy", 
    windy="windy", 
    stormy="stormy"
}

export interface DiaryEntry {
    id:number , 
    date: string , 
    weather:Weather,
    visibility:Visibility, 
    comment : string 
}
//export type NonSensitiveDiaryEntry = Pick<DiaryEntry, "id"|"date"|"weather"|"visibility" >
export interface historyType {    
    userId: string,
    score: Number, 
    date?: Date, 
    level: Number, 
    duration: Number,
};

export interface UserInfo{
    usuario:string, 
    nombre:string, 
    apellido:string, 
    password: string ,     
    level: number, // Nivel actual del usuario
    score: number, // Puntuación total del usuario        
    rol:number // 1: admin ->  0: Normal
    bestScoreLevel:number[]
}

export type UserGet = Omit<UserInfo,"password">; 


export interface RequestToken extends Request{
    userId?:string
    usuario?:string 
}
    
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">


export type NewData = Omit<DiaryEntry, "id">


