import { DiaryEntry , NewData, NonSensitiveDiaryEntry} from "../types"
import diaryData from "./diaries.json"



const diaries : Array<DiaryEntry> = diaryData as Array<DiaryEntry>

export const getEntries =():DiaryEntry[]=> diaries
export const getEntriesSinsitiveInf =():NonSensitiveDiaryEntry[]=> {
    return diaries.map(({id, date, weather, visibility})=> 
    {
        return {
            id, date, weather, visibility
        }
    }
    )
}

export const findById=(id:number ):NonSensitiveDiaryEntry|undefined=>{
const entry = diaries.find(d=>d.id==id); 
if(entry){
    const {comment, ...resetOfDiary }=entry
    return resetOfDiary; 
}
return undefined; 
}


export const addEntry =(NuevosDatos:NewData ):DiaryEntry| undefined=>{
    const newData={
        id:Math.max(...diaries.map(d=>d.id))+1,
        ...NuevosDatos
    }
    diaries.push(newData); 
    return newData; 
}
