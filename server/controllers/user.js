import User from "../models/user.js";
import Order from "../models/order.js";
import { validationResult } from "express-validator";
//
const removeSensitiveData = (user) => {
    user.encryPassword = undefined;
    user.salt = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.__v = undefined;
};
// getUserById is used by router.param as callback
export const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if(!user) return res.json({"error": "User not found in database"});
        req.profile = user;
        next();
    } catch (error) {
        return res.json({"error": "User not found in database"});
    }
};

export const get = (req, res) => {
    removeSensitiveData(req.profile);
    return res.json(req.profile);
};

export const update = async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()) return res.json({error: result.errors[0].msg});
        const user = req.profile;
        const newData = req.body;
        Object.assign(user, newData);
        await user.save();
        removeSensitiveData(user);
        return res.json(user);
    } catch(error) {
        return res.json({"error": "User data couldn't be updated"});
    }
};

export const purchaseList = async (req, res) => {
    try {
        const order = await Order.find({user: req.profile._id});
        if(!order) return res.json({"error": "No order in this account"});
        await order.execPopulate("user", ["name"]);
        return res.json(order);
    } catch(error) {
        return res.json({"error": "No order in this account"});
    }
};

export const pushOrderInPurchaseList = async (req, res, next) => {
    try {
        let purchases = [];
        req.body.order.products.forEach(product => {
            purchases.push({
                _id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                amount: req.body.order.amount,
                transaction_id: req.body.order.transaction_id 
            });
        });
        // Store purchases in database
        await User.findOneAndUpdate(
            {"_id": req.profile._id }, 
            {$push: {purchases: purchases}}
        );
        next();
    } catch (error) {
        return res.json({error: "Unable to save the purchase list in database"});
    }
};

