import { check } from "express-validator";

export const create = [
    check("name").isLength({min : 1}).withMessage("Category name should have atleast one character")
];

export const update = [
    check("name").custom(val => {
        if(val !== undefined) return val.length > 0;
        return true; 
    }).withMessage("Category name should have atleast one character")
];