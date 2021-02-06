import { check } from "express-validator";

export const update = [
    check("name").custom(val => {
        if(val !== undefined) return val.length > 0;
        return 1;
    }).withMessage("Name should have atleast 1 character."),
    check("email").custom(val => {
        return val === undefined
    }).withMessage("Cannot change registered email id"),
    check("password").custom(val => {
        return val === undefined
    }).withMessage("Cannot change password from this link"),
];