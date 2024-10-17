import { NewData, Visibility, Weather } from "./types";

 const newDatoVerifica=(object:any):NewData=>{
 
    return{
        comment:parseCommet(object.comment), 
        date: paseDate(object.date), 
        weather: parseWather(object.weather), 
        visibility: parseVisibility(object.visibility)
    }

}

const parseVisibility=(dato:any):Visibility=>{
if(!isString(dato) || !isVisibility(dato)){
  throw new Error("Error en visibility ");
  

}

return dato; 
}

const isVisibility=(data:any):boolean=>{
    return Object.values(Visibility).includes(data)
}
const parseWather = (dato: any):Weather=>{
    if(!isString(dato) || !isWeather(dato)){
        throw new Error("Erorr en la whather")
    }

    return dato
}

const isWeather =(dato:any):boolean=>{
  return Object.values(Weather).includes(dato)

}

const paseDate=(data:any):string =>{

    if(!isString(data) || !isDate(data)){
        throw new Error(" Error en la fecha ");        
    }
    return data; 
}

const isDate=(date: string ):boolean=>{
   return Boolean(Date.parse(date))    
}
const parseCommet=(in_comment:any):string =>{
    if(!isString(in_comment)){
        throw new Error("Commnetario invalido")
    }
    return in_comment
}

const isString=(cadena:string):boolean=>(typeof cadena=="string") 


export default newDatoVerifica ; 