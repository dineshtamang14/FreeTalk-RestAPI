import * as dotenv from "dotenv"
dotenv.config();
import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import mongoose from "mongoose";
import cors from "cors"

const app = express()

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// global interface
declare global {
    interface CustomError extends Error {
        status?: number
    }
}

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if(error.status){
        return res.status(error.status).json({ message: error.message })
    }
    return res.status(500).json({ message: "something went wrong!" })
})

const start = async () => {
    mongoose.set('strictQuery', true);
    if(!process.env.MONGO_URI) throw new Error("MONGO_URI is required");    
    try {
       await mongoose.connect(process.env.MONGO_URI);
    } catch(err){
        console.log(err);
        throw err
    }
}

start()

app.get("/", (req, res) => {
    res.status(200).json({
        username: "dineshtamang14",
        email: "dineshtamang14@gmail.com",
        isAdmin: true
    })
})

app.listen(5000, () => console.log("server is running on port 5000"))