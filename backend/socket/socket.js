import {Server} from "socket.io"
import express from "express"
import http from "http"


export const app = express();

export const server = http.createServer(app)
export const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET", "POST"]
    }
})

export const getRecieverId = (recieverId)=>{
    return userSocketMap[recieverId]
}


const userSocketMap = {}

io.on('connection' , (socket)=>{
    console.log(socket.id + ' connected');
    const userId = socket.handshake.query.userId
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id
    }
    //
    io.emit("getOnlineUsers" , Object.keys(userSocketMap))
    
    socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
})

