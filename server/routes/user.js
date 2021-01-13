import express from "express";
const router = express.Router();
import { extractToken, isAuthenticated } from "../controllers/auth.js";
import * as user from "../controllers/user.js";
//
router.get("/user/:user_id", extractToken, isAuthenticated, user.get);
//
router.put("/user/:user_id", extractToken, isAuthenticated, user.update);
//
router.get("/orders/user/:user_id", extractToken, isAuthenticated, user.purchaseList);
//
export default router;