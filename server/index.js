const express = require('express');
const bodyParser = require("body-parser");
const chatRouter = require("./routes");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
// const Chat = require("./chatSchema");
// const connect = require("./dbConnection");
// const Count = require('./countSchema');

// cors 
app.use(cors());

//bodyparser middleware
app.use(bodyParser.json());

//routes
// app.use("/chats", chatRouter);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

let count;
io.on("connection", (socket) => {

    count = socket.client.conn.server.clientsCount;
    io.sockets.emit("counter", { count: count });
    // let countUser = new Count({ count: count });
    // countUser.save()

    // console.log(`UseR Connected ${socket.id}`);
    socket.on("start_game", (data) => {
        console.log("start game", data);
        setInterval(function () {
            io.sockets.emit('end_game', { endGame: "end Game" })
        }, 5 * 1000);
    })
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with Id: ${socket.id}, joind room: ${data}`);
    })


    socket.on("send_message", (data) => {
        console.log("data.room", data);
        socket.to(data.room).emit("receive_message", { message: data.message });

        // save chat to the database
        connect.then(db => {
            console.log("connected correctly to the server");
            let chatMessage = new Chat({ message: data.message, sender: data.author });
            chatMessage.save();
        });
    })
    socket.on("disconnect", () => {
        count = socket.client.conn.server.clientsCount;
        socket.broadcast.emit("counter", { count: count });
        // let countUser = new Count({ count: count });
        // countUser.save()
        // console.log("User Disconnected", socket.id);
    })
});



server.listen(8080, () => {
    console.log("Server running");
})
