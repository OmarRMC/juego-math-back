import {Router}  from "express"
import newDatoVerifica from "../utils"
import * as diaryServices from "../services/diaryServices"

const router= Router(); 

router.get("/", (_req, res )=>{
    res.send(diaryServices.getEntriesSinsitiveInf())
})


router.get("/:id", (req, res)=>{
    //const  diary = diaryServices.findById(+req.params.id); 
    const  diary = diaryServices.findById(Number(req.params.id)); 
    (diary != null)? res.send(diary): res.sendStatus(404); 
})


router.post("/", (req, res)=>{
    
    try {

        const newDatoVerifica1= newDatoVerifica(req.body); 
        
        const newData= diaryServices.addEntry(newDatoVerifica1); 
        res.json(newData);     
 

    } catch (error:any) {
        res.status(404).send(error.message)
    }
    
})


export default router; 
