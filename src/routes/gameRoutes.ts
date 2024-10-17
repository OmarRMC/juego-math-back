import { Router } from "express"


import * as gameController from "../controllers/gameController"
import { authMiddleware, rolMiddleware } from "../middleware/AuthMid";
const router= Router(); 


router.get("/",gameController.game); 
router.get("/get_users",authMiddleware,  rolMiddleware,gameController.litsUsers); 

router.get("/history_list",authMiddleware,gameController.litsHistory); 

router.post("/new_history",authMiddleware,gameController.add_new_history); 

router.get("/get_history/level/:nivel",authMiddleware,gameController.get_historyId); 


export default router; 
