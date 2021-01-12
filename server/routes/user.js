import express from "express";
const router = express.Router();
import { extractToken, reauthenticate } from "../controllers/auth.js";
import * as user from "../controllers/user.js";
//
router.get("/user/:_id", extractToken, reauthenticate, user.get);
//
router.put("/user/:_id", extractToken, reauthenticate, user.update);
//
router.get("/orders/user/:user_id", extractToken, reauthenticate, user.purchaseList);
//
export default router;