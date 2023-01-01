import * as dotenv from "dotenv"
dotenv.config();
import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import mongoose from "mongoose";
import cors from "cors"
import { 
    newPostRouter, 
    showPostRouter, 
    updatePostRouter, 
    deletePostRouter,
    newCommentRouter,
    deleteCommentRouter
} from "./routers/index"

const app = express()

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// all the routers
app.use(newPostRouter);
app.use(showPostRouter);
app.use(updatePostRouter);
app.use(deletePostRouter);
app.use(newCommentRouter);
app.use(deleteCommentRouter);

// for unknow path
app.use("*", (req: Request, res: Response, next: NextFunction) => {
    const error = new Error("not found!") as CustomError;
    error.status = 404;
    next(error);
})

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

app.listen(5000, () => console.log("server is running on port 5000"))