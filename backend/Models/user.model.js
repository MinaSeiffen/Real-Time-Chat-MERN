import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        reqiured: true
    },
    userName:{
        type: String,
        reqiured: true,
        unique: true
    },
    password:{
        type:String,
        reqiured:true,
        minLength: 6,
    },
    gender:{
        type:String,
        reqiured:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    }
} , {timestamps: true})

const userModel = mongoose.model("User",userSchema);

export default userModel