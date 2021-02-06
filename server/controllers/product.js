import Product from "../models/product.js";
import {validationResult} from "express-validator";
import {AWS_ID, AWS_BUCKET, AWS_SECRET, AWS_REGION} from "../config.js";
import AWS from "aws-sdk";
import { v4 } from 'uuid';
const S3 = new AWS.S3({
    "accessKeyId": AWS_ID,
    "secretAccessKey": AWS_SECRET,
    "region": AWS_REGION
});

export const getProductById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id);
        if(!product) return res.json({"error": "Product not found in database"});
        await product.execPopulate("category", ["name"]);
        req.product = product;
        next();
    } catch(error) {
        return res.json({"error": "Product not found in database"});
    }
};

export const get = (req, res) => {
    return res.json(req.product);
};

export const create = async (req, res) => { 
    try {
        const result = validationResult(req);
        if(!result.isEmpty()) return res.json({error: result.errors[0].msg});
        if(!req.file) return res.json({error: "A photo of the product should be provided."});
        const isDuplicate = await Product.findOne({name: req.body.name});
        console.log("Checked for duplicate data");
        if(isDuplicate) return res.json({error: "A product with same name is already present in database."});
        const product = new Product(req.body);
        const myFile = req.file.originalname.split(".");
        const fileType = myFile[myFile.length - 1];
        const params = {
            Bucket: AWS_BUCKET,
            Key: `${v4()}.${fileType}`,
            Body: req.file.buffer
        };
        const data = await S3.upload(params).promise();
        console.log("Photo Uploaded");
        product.photoURL = data.Location;
        product.photoKey = data.key;
        await product.save();
        console.log("Product saved in database");
        return res.json(product);
    } catch(error) {
        return res.json(error);
    }
};

export const update = async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()) return res.json({error: result.errors[0].msg});
        const product = req.product;
        const newData = req.body;
        Object.assign(product, newData);
        await product.save();
        if(!req.file) return res.json(product);
        const params = {
            Bucket: AWS_BUCKET,
            Key: product.photoKey,
            Body : req.file.buffer
        };
        console.log("Uploading photo...");
        await S3.upload(params).promise();
        return res.json(product);
    } catch (error) {
        return res.json(error);
    }
};

export const erase = async (req, res) => {
    try {
        const product = req.product;
        const key = product.photoKey;
        const params = {
            Bucket: AWS_BUCKET,
            Key: key
        };
        await S3.deleteObject(params).promise();
        await product.remove();
        console.log("Product deleted from database");
        return res.json({"message": `Product ${product.name} is deleted from database`});
    } catch (error) {
        return res.json(error);
    }
};

export const getAll = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 8;
        let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
        const products = await Product
        .find()
        .select("-photoKey")
        .execPopulate("category")
        .limit(limit)
        .sort(sortBy);
        return res.json(products);
    } catch(error) {
        return res.json(error);
    }
};

export const updateStock = async (req, res, next) => {
    try {
        let myOperations = req.body.order.products.map(product => {
            return {
                updateOne: {
                    filter: {_id: product._id},
                    update: {$inc: {stock: -product.count, sold: +product.count}}
                }
            };
        });
        await Product.bulkWrite(myOperations, {});
        next();
    } catch(error) {
        return res.json({error: "Bulk operations failed"});
    }
};
// need to comeback for getAll and getProductById

