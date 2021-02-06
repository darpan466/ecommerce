import express from "express";
import { isSignedIn, isAdmin, isAuthenticated } from "../controllers/auth.js";
import * as category from "../controllers/category.js"
import { getUserById } from "../controllers/user.js";
import * as check from "../validators/category.js";
const router = express.Router();

router.param("user_id", 
    getUserById
);

router.param("category_id", 
    category.getCategoryById
);

router.post("/category/create/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    check.create, 
    category.create
);

router.get("/category/get/:category_id", 
    category.get
);

router.get("/categories", 
    category.getAll
);

router.put("/category/update/:category_id/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    check.update, 
    category.update
);

router.delete("/category/delete/:category_id/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    category.erase
);

export default router;