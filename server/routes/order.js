import express from "express";
const router = express.Router();
import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/auth.js";
import { getUserById, pushOrderInPurchaseList } from "../controllers/user.js";
import { updateStock } from "../controllers/product.js";
import * as order from "../controllers/order.js";

router.param("user_id",
    getUserById    
);

router.param("order_id",
    order.getOrderById
);

router.post("/order/create/:user_id",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    order.create
);

router.get("/order/all/:user_id",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    order.getAll
);

router.get("/order/status/:order_id/:user_id", 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    order.getOrderStatus
);

router.put("/order/status/update/:order_id/:user_id",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    order.updateOrderStatus
)

export default router;


