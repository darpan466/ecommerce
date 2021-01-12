import mongoose from "mongoose";
import crypto from "crypto";
import { v4 } from 'uuid';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    lastname: {
        type: String, 
        required: false,
        maxlength: 32,
        trim: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    encryPassword: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {timestamps: true});

userSchema.virtual("password")
    .set(function(password) {
        this.salt = v4();
        this.encryPassword = this.securePassword(password);
    });

userSchema.methods = {
    securePassword: function(plainPassword) {
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        } catch(err) {
            console.log(err);
            return "";
        }
    },

    authenticate: function(password) {
        return this.securePassword(password) === this.encryPassword;
    }
};

const User = mongoose.model("User", userSchema);
export default User;


