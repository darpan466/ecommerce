import User from "../models/user.js";
import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt"; 
import secret from "../config.js";
//
export const signup = async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()) return res.status(400).json({"error": result.errors[0].msg});
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({"name": user.name, "email": user.email, "id": user._id});
    } catch(error) {
        return res.status(409).json({"error": "Email id is already registered"});
    }
};
//
export const signin = async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()) return res.status(400).json({"error": result.errors[0].msg});
        const user = await User.findOne({email: req.body.email});
        if(!user.authenticate(req.body.password)) return res.status(401).json({"error": "Password is incorrect."});
        const token = jwt.sign({_id: user._id, name: user.name}, secret);
        res.cookie("token", token, {expire: new Date() + 9999});
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}});
        // try removing token from the body because its already present in the res.cookie
    } catch (error) {
        return res.status(404).json({"error": "Email Id is unregistered"});
    }
};

export const signout = (req, res) => {
    res.clearCookie("token");
    res.json({"message": "user signout successfully"});
};

export const extractToken = expressJwt({
    secret,
    userProperty: "tokenIssuedTo"
});

export const reauthenticate = (req, res, next) => {
    if(req.params._id !== req.tokenIssuedTo._id) {
        return res.status(403).json({error: "Access Denied"});
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if(req.profile.role == 0) {
        return res.status(403).json({error: "Admin privileges not available"});
    }
    next();
};





