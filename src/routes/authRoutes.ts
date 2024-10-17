import {Router} from "express"
import * as AuthControl from "../controllers/authController"
import { authMiddleware, rolMiddleware } from "../middleware/AuthMid";
const router=Router(); 

router.post("/register",AuthControl.register)

router.post("/login",AuthControl.login)


router.post("/logout",(_req, res)=>{
    res.send("Logout"); 
})

router.post("/forgot-password",authMiddleware,AuthControl.change_pwd)

router.post("/reset-password",authMiddleware, rolMiddleware,AuthControl.reset_pwd)

router.get("/profile", authMiddleware, AuthControl.profile)



export default router; 