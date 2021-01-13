import User from "../models/user.js";
import Order from "../models/order.js";
//
const removeSensitiveData = (user) => {
    user.encryPassword = undefined;
    user.salt = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.__v = undefined;
};
//
export const get = async (req, res) => {
    removeSensitiveData(req.profile);
    return res.json(req.profile);
};
//
export const update = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.profile._id, req.body, {new: true});
        removeSensitiveData(updatedUser);
        return res.json(updatedUser);
    } catch(error) {
        return res.status(404).json({error: "User not found in database"});
    }
};
//
export const purchaseList = async (req, res) => {
    try {
        const order = await Order.find({user: req.params.userid}).populate("user", "_id name");
        return res.json(order);
    } catch(error) {
        return res.status(400).json({"error": "No orders in this account"});
    }
}; 
//
export const pushOrderInPuchaseList = async (req, res, next) => {
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
        // store this in DB
        // with {new: true}, updated value is sent back by database, not the old one
        const user = await User.findOneAndUpdate(req.params.userid, {$push : purchases}, {new: true}); 
        next();
    } catch(error) {
        return res.status(400).json({
            error: "Unable to save the purchase list"
        });
    }
};