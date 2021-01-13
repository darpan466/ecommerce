import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    products: [{
        type: ObjectId,
        ref: "ProductsInCart"
    }],
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