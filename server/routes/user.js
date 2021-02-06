import express from "express";
const router = express.Router();
import { isSignedIn, isAuthenticated } from "../controllers/auth.js";
import * as user from "../controllers/user.js";
import * as check from "../validators/user.js";

router.param("user_id", 
    user.getUserById
);

router.get("/user/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    user.get
);


router.put("/user/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    check.update, 
    user.update
);

router.get("/orders/user/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    user.purchaseList
);

export default router;