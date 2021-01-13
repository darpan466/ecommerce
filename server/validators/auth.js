import {check} from "express-validator";

export const signup = [
    check("name").isLength({min: 1}).withMessage("Name should have atleast 1 character."),
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({min: 6}).withMessage("Password should have atleast 6 characters."),
    check("password2").custom((value, {req}) => value === req.body.password).withMessage("Password confirmation does not match")
];

export const signin = [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({min: 1}).withMessage("Password field is required.")
];

