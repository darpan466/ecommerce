import User from "../models/user.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt"; 
import { JWTsecret as secret } from "../config.js";

export const signup = async (req, res) => {
    try {
        const result = validationResult(req);

        if(!result.isEmpty()) return res.json({"error": result.errors[0].msg});

        const user = new User(req.body);
        
        await user.save();
        
        return res.json({"name": user.name, "email": user.email, "id": user._id});
    
    } catch(error) {

        return res.json({"error": "Email id is already registered"});
    }
};

export const signin = async (req, res) => {
    try {
        const result = validationResult(req);

        if(!result.isEmpty()) return res.json({"error": result.errors[0].msg});

        const user = await User.findOne({email: req.body.email});

        if(!user) return res.json({"error": "Email Id is unregistered"});

        if(!user.authenticate(req.body.password)) return res.json({"error": "Password is incorrect."});

        const token = jwt.sign({_id: user._id, name: user.name}, secret);
        
        res.cookie("token", token, {maxAge: 60 * 60 * 1000, httpOnly: true});
        
        const {_id, name, email, role} = user;
        
        return res.json({user: {_id, name, email, role}});

    } catch (error) {
        
        return res.json({"error": "Email Id is unregistered"});
    }
};

export const signout = (req, res) => {
    res.clearCookie("token");
    return res.json({"message": "user signed out successfully"});
};

export const isSignedIn = expressJwt({
    secret,
    getToken: req => req.cookies.token,
    userProperty: "signedInAs"
});

export const isAuthenticated = async (req, res, next) => {
    if(req.profile._id != req.signedInAs._id) {
        return res.json({"error": "Access Denied"});
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if(req.profile.role == 0) {
        return res.json({"error": "Admin privileges not available"});
    }
    next();
};





