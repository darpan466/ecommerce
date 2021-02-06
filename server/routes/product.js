import express from "express";
const router = express.Router();
import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";
import { getCategoryById } from "../controllers/category.js";
import * as product from "../controllers/product.js";
import * as check from "../validators/product.js"; 
import multer from "multer";
const multipartParser = multer().single("photo");

router.param("user_id", 
    getUserById
);

router.param("category_id", 
    getCategoryById
);

router.param("product_id", 
    product.getProductById
);

router.post("/product/create/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    multipartParser, 
    check.upload, 
    product.create
);

router.get("/product/get/:product_id", 
    product.get
);

router.delete("/product/delete/:product_id/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    product.erase
);

router.put("/product/update/:product_id/:user_id", 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    multipartParser, 
    check.update, 
    product.update
);

router.get("/products", 
    product.getAll
);

export default router;