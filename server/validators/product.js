import { check } from "express-validator";

export const upload = [
    check("name").isLength({min: 1}).withMessage("Name should have atleast 1 character."),
    check("description").isLength({min: 1}).withMessage("Description should have atleast 1 character."),
    check("price").isFloat({min: 0}).withMessage("Price should be a number greater than or equal to 0."),
    check("stock").isFloat({min: 0}).withMessage("Stock should be a number greater than or equal to 0."),
    check("category").notEmpty().withMessage("A category should be provided")
];

export const update = [
    check("name").custom(val => {
        if(val !== undefined) return val.length > 0;
        return true;
    }).withMessage("Name should have atleast 1 character."),
    //
    check("description").custom(val => {
        if(val !== undefined) return val.length > 0;
        return true;
    }).withMessage("Decription should have atleast 1 character."),
    //
    check("price").custom(val => {
        if(val !== undefined) return val >= 0;
        return true;
    }).withMessage("Price should be a number greater than or equal to 0."),
    //
    check("stock").custom(val => {
        if(val !== undefined) return val >= 0;
        return true;
    }).withMessage("Stock should be a number greater than or equal to 0."),
    //
    check("sold").custom(val => {
        if(val !== undefined) return val >= 0;
        return true;
    }).withMessage("Sold items should be a number greater than or equal to 0."),
];