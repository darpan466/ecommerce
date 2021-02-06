import Order from "../models/order.js";

export const getOrderById = async (req, res, next, id) => {
    try {
        const order = await Order.findById(id);
        if(!order) return res.json({error: "Order not found in database"});
        await order.execPopulate("products", ["name"]);
        req.order = order;
        next();
    } catch(error) {
        return res.json({error: "Order not found in database"});
    }
};

export const create = async (req, res) => {
    try {
        req.body.order.user = req.profile;
        const order = new Order(req.body.order);
        await order.save();
        return res.json(order);
    } catch(error) {
        return res.json({error: "Failed to save your order in database"});
    }
};

export const getAll = async (req, res) => {
    try {
        const order = await Order.find();
        if(!order) return res.json({error: "No order found in database"});
        await order.execPopulate("user", ["name"]); 
        return res.json(order);
    } catch(error) {
        return res.json({error: "No order found in database"});
    }
};

export const getOrderStatus = async (req, res) => {
    try {
        return res.json({status: req.order.status});
    } catch(error) {
        return res.json({error: "Couldn't retrieve the status of the order"});
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = req.order;
        order.status = req.body.status;
        await order.save();
        return res.json(order);
    } catch(error) {
        return res.json({error: "Couldn't update the status of the order"});
    }
};





