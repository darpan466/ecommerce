import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        required: true,
        minlength: 1,
        unique: true
    },
    description: {
        type: String,
        trim: true, 
        required: true
    },
    price: {
        type: Number,
        min: [0, "Price should be a number greater than or equal to 0."],
        required: true,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number,
        min: [0, "Stock should be a number greater than or equal to 0."],
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    photoURL: {
        type: String,
        default: undefined
    },
    photoKey: {
        type: String,
        default: undefined
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
export default Product;