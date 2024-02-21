import mongoose from "mongoose";

const connectingToMongoDB = async(req , res)=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Successful connection to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB",error.message);
    }
} 

export default connectingToMongoDB