import express from "express";
import * as auth from "../controllers/auth.js";
import * as check from "../validators/auth.js";
const router = express.Router();
//
router.post("/signup", check.signup, auth.signup);
//        
router.post("/signin", check.signin, auth.signin);
//
router.get("/signout", auth.signout);    
//
export default router; 

