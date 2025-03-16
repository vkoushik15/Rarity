
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:5173", 
//         methods: ["GET", "POST"],
//     },
// });


// let activeUsers = [];

// io.on("connection", (socket) => {
//     console.log("New client connected: ", socket.id);

    

//     socket.on("new-user-add", (userId) => {
        
//         console.log(userId)
        
//         if (!activeUsers.some((user) => user.userId === userId)) {
            
//             activeUsers.push({ userId, socketId: socket.id });
//             console.log(`User ${userId} connected`);
//         }
//         io.emit("active-users", activeUsers); 
//        console.log(activeUsers)
//     });

    
//     socket.on("send-message", (messageData) => {
//         const { receiverId } = messageData;
//         const receiver = activeUsers.find((user) => user.userId ===receiverId );
       
//         if (receiver) {
//             console.log('message from socketis',messageData)
//             console.log('recsocid',receiver.socketId)

//             io.to(receiver.socketId).emit("receive-message", messageData)
    
//              // Send message to receiver
//         }
//     });
//     socket.on("new-bid",(bidData)=>{
//         console.log('new bid recived :',bidData)
//         io.emit('update-bids',bidData)
//     })

//     // When a user disconnects
//     socket.on("disconnect", () => {
//         activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//         console.log(`User disconnected: ${socket.id}`);
//         io.emit("active-users", activeUsers); // Update active users list
//     });
// });

// // Start the server
// server.listen(8800, () => {
//     console.log("Server running on http://localhost:8800");
// });


const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

let activeUsers = [];

io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);

    // Add new user to active users
    socket.on("new-user-add", (userId) => {
        if (!activeUsers.some((user) => user.userId === userId)) {
            activeUsers.push({ userId, socketId: socket.id });
            console.log(`User ${userId} connected`);
        }
        io.emit("active-users", activeUsers);
    });

    // Send message to receiver
    socket.on("send-message", (messageData) => {
        const { receiverId } = messageData;
        const receiver = activeUsers.find((user) => user.userId === receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("receive-message", messageData);
        }
    });

    // Notify all clients about a new chat
    socket.on("new-chat", (chatData) => {
        console.log("New chat created:", chatData);
        io.emit("update-chats", chatData); // Notify all clients
    });

    // Handle new bids
    socket.on("new-bid", (bidData) => {
        console.log("New bid received:", bidData);
        io.emit("update-bids", bidData);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log(`User disconnected: ${socket.id}`);
        io.emit("active-users", activeUsers);
    });
});

// Start the server
server.listen(8800, () => {
    console.log("Server running on http://localhost:8800");
});