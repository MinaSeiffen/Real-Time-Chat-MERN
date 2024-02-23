import  path  from "path";
import express  from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import authRouter from "./Routes/auth.route.js"
import connectingToMongoDB from "./db/connectingDB.js"
import messagesRouter from "./Routes/messages.route.js"
import userRouter from "./Routes/user.route.js"
import { app, server } from "./socket/socket.js";

const PORT = process.env.Port || 5000

const __dirname = path.resolve()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/users', userRouter )

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*" , (req, res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist" , "index.html"))
})


server.listen(PORT, ()=>{
    connectingToMongoDB()
    console.log( `Server is running on port ${PORT}`);
})