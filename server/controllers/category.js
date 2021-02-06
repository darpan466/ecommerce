import Category from "../models/category.js";
import { validationResult } from "express-validator";

export const getCategoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id);
        if(!category) return res.json({"error": "Category not found in database"});
        req.category = category;
        next();
    } catch(error) {
        return res.json({"error": "Category not found in database"});
    }
};

export const create = async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()) return res.json({error: result.errors[0].msg});
        const category = new Category(req.body);
        await category.save();
        return res.json(category);
    } catch(error) {
        return res.json({"error": "Not able to save category in database"});
    }
};

export const get = (req, res) => {
    return res.json(req.category);
};

export const getAll = async (req, res) => {
    try {
        const category = await Category.find();
        if(!category) return res.json({"error": "No categories found"});
        return res.json(category);
    } catch(error) {
        return res.json({"error": "No categories found"});
    }
};

export const update = async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()) return res.json({error: result.errors[0].msg});
        const category = req.category;
        category.name = req.body.name;
        await category.save();
        return res.json(category);
    } catch(error) {
        return res.json({"error": "Not able to save changes made to category in database"});
    }
};

export const erase = async (req, res) => {
    try {
        const category = req.category;
        await category.remove();
        return res.json({"message": `${category.name} category is deleted from database`});
    } catch(error) {
        return res.json({"error": `Unable to delete ${category.name} category from database`});
    }
};




