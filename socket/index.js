/*const io = require("socket.io")(8800,{
cors:{
    origin:"http://localhost:5173"
}

})
let activeusers =[]
io.on('connection',(socket)=>{

    socket.on("new-user-add",(newuserID)=>{

        if(!activeuser.some((user)=>user.userId=== newuserID)){
            activeusers.push({userId:newuserID,socketId:socket.id})
            console.log('new user connected',activeusers)
        }
        io.emit("get-users",activeusers)
    })

    socket.on("disconnect",()=>{
        activeusers = activeusers.filter((user)=>user.socketId!==socket.id)
        console.log("user disconnected",activeusers)
        io.emit('get-users',activeusers)
    })

    socket.on("send-message",(data)=>{
        const{recieverId}=data
        const user = activeusers.find((user)=>user.userId===recieverId)
        console.log("sending from socket to",recieverId)
        console.log('data',data)
        if(user){
            io.to(user.socketId).emit('recieve-message'),data
        }
    })
})*/
/*const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:5173", // Frontend URL
    },
});

let activeusers = [];

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    // Add a new user
    socket.on("new-user-add", (newuserID) => {
        if (!activeusers.some((user) => user.userId === newuserID)) {
            activeusers.push({ userId: newuserID, socketId: socket.id });
            console.log("New user connected", activeusers);
        }
        io.emit("get-users", activeusers);
    });

    // Disconnect a user
    socket.on("disconnect", () => {
        activeusers = activeusers.filter((user) => user.socketId !== socket.id);
        console.log("User disconnected", activeusers);
        io.emit("get-users", activeusers);
    });

    // Send message
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeusers.find((user) => user.userId === receiverId);
        console.log("Sending message to:", receiverId, data);
        if (user) {
            io.to(user.socketId).emit("recieve-message", data);
        }
    });
});
*/
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173", // Frontend URL (adjust if different)
        methods: ["GET", "POST"],
    },
});

// Store users and their active sockets
let activeUsers = [];

io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);

    // When a new user connects, add them to active users list

    socket.on("new-user-add", (userId) => {
        console.log('aaa')
        console.log(userId)
        console.log('bb')
        if (!activeUsers.some((user) => user.userId === userId)) {
            console.log('a')
            activeUsers.push({ userId, socketId: socket.id });
            console.log(`User ${userId} connected`);
        }
        io.emit("active-users", activeUsers); // Broadcast active users list
       console.log(activeUsers)
    });

    // Handle message sending
    socket.on("send-message", (messageData) => {
        const { receiverId } = messageData;
        const receiver = activeUsers.find((user) => user.userId ===receiverId );
       
        if (receiver) {
            console.log('message from socketis',messageData)
            console.log('recsocid',receiver.socketId)

            io.to(receiver.socketId).emit("receive-message", messageData)
    
             // Send message to receiver
        }
    });
    socket.on("new-bid",(bidData)=>{
        console.log('new bid recived :',bidData)
        io.emit('update-bids',bidData)
    })

    // When a user disconnects
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log(`User disconnected: ${socket.id}`);
        io.emit("active-users", activeUsers); // Update active users list
    });
});

// Start the server
server.listen(8800, () => {
    console.log("Server running on http://localhost:8800");
});
