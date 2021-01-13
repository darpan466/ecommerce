import express from "express";
import { extractToken, isAdmin, isAuthenticated } from "../controllers/auth.js";
import * as category from "../controllers/category.js"
const router = express.Router();

//
router.post("/category/create/:user_id", extractToken, isAuthenticated, isAdmin, (req, res)=>res.send("OK!"));


//
export default router;