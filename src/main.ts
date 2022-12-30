import * as dotenv from "dotenv"
dotenv.config();
import express from "express"
import morgan from "morgan"
import mongoose from "mongoose";

const app = express()

// middleware
app.use(express.json());
app.use(morgan('dev'));

const start = async () => {
    mongoose.set('strictQuery', true);
    if(!process.env.MONGO_URI) throw new Error("MONGO_URI is required");    
    try {
       await mongoose.connect(process.env.MONGO_URI);
    } catch(err){
        throw err
    }
    app.listen(5000, () => console.log("server is running on port 5000"))
}

start()

app.get("/", (req, res) => {
    res.status(200).json({
        username: "dineshtamang14",
        email: "dineshtamang14@gmail.com",
        isAdmin: true
    })
})