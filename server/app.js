import dotenv from "dotenv";
dotenv.config();
//
import express from "express";
import mongoose from "mongoose";
const APP = express();
//
import cookieParser from "cookie-parser";
import cors from "cors";
APP.use(express.json());
APP.use(cookieParser());
APP.use(cors());
//
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
//
APP.use("/api", authRoutes);
APP.use("/api", userRoutes);
// port
const PORT = process.env.PORT || 8000;

// database URI
const CONNECTION_URI = process.env.CONNECTION_URI;

// database connection
mongoose.connect(CONNECTION_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true
                })
                .then(APP.listen(PORT, ()=>{
                    console.log(`Server running on http://localhost:${PORT}`);
                    console.log(`Database running on ${CONNECTION_URI}`);
                }))
                .catch((err)=>{
                    console.log(err.message);
                    process.exit(1);    
                });
