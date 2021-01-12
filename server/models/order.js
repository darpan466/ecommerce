import mongoose from "mongoose";
import ProductsInCart from "./productsInCart.js";
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    products: [ProductsInCart],
    tansaction_id: Number,
    amount: Number,
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }     
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

export default Order;