const express = require("express");
const router = express.Router();
const socketIO = require("socket.io");
const http = require("http");

const app = express();
app.use(router);

const server = http.createServer(app);
const io = socketIO(server);

io.on('connect', (socket) => {
    socket.on('voice-chat:join', ({ channel, user }) => {
        socket.join(channel);
        console.log(user + " joined to channel: " + channel);

        let data = { userId: user, socketId: socket.id };
        io.to(channel).emit('voice-chat:update-users', (data));
    });

    socket.on('voice-chat:update-new-user', (data) => {
        let userData = { userId: data.userId, socketId: data.socketId };
        io.to(data.newUser).emit('voice-chat:update-users', (userData));
    })

    socket.on("voice-chat:call", (data) => {
        socket.to(data.to).emit("voice-chat:receiving-call", {
            offer: data.offer,
            socket: socket.id,
            from: data.from
        });
    });

    socket.on("voice-chat:answer-call", (data) => {
        socket.to(data.to).emit("voice-chat:answer-recieved", {
            from: data.from,
            answer: data.answer
        });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("voice-chat:remove-user", {
            socket: socket.id
        });
    });
})

server.listen(process.env.PORT || 5002, () =>
    console.log(`Server has started.. PORT 5002`)
);
