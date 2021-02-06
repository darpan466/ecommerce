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
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"] 
    },
    user: {
        type: ObjectId,
        ref: "User"
    }     
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);
export default Order;