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
    try {
        const user = await User.findById(req.params._id);
        req.profile = user;
        removeSensitiveData(req.profile);
        return res.json(req.profile);  
    } catch(error) {
        return res.status(400).json({err: "User not found in database"});
    }
};
//
export const update = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params._id, req.body, {new: true});
        removeSensitiveData(updatedUser);
        return res.json(updatedUser);
    } catch(error) {
        return res.status(404).json({error: "User not found in database"});
    }
};
//
export const purchaseList = async (req, res) => {
    Order.find({user: })
};
//