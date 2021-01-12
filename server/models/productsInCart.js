import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productsInCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product", 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        price: Number,
        required: true
    }
}, {timestamps: true});

const ProductsInCart = mongoose.model("ProductsInCart", productsInCartSchema);

export default ProductsInCart;