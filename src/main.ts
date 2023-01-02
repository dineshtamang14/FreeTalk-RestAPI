import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
    mongoose.set('strictQuery', true);
    if(!process.env.JWT_KEY) throw new Error("jwt key is required"); 
    if(!process.env.MONGO_URI) throw new Error("MONGO_URI is required");    
    try {
       await mongoose.connect(process.env.MONGO_URI);
    } catch(err){
        console.log(err);
        throw err
    }
}

start()

app.listen(8080, () => console.log("server is running on port 5000"))