const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const videoUsers = {};

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
 if (!videoUsers[socket.id]) {
  videoUsers[socket.id] = socket.id;
 }

 socket.on("join", ({ name, room, profileimg }, callback) => {
  const { error, user } = addUser({ id: socket.id, name, profileimg, room });

  if (error) return callback(error);
  socket.join(user.room);
  socket.broadcast.to(user.room).emit("message", {
   user: "admin",
   profileimg: profileimg,
   text: `${user.name} has joined!`,
  });

  io
   .to(user.room)
   .emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

  callback();
 });

 socket.on("sendMessage", (message, callback) => {
  const user = getUser(socket.id);

  io.to(user.room).emit("message", {
   user: user.name,
   profileimg: user.profileimg,
   text: message,
  });

  callback();
 });

 socket.on("disconnect", () => {
  const user = removeUser(socket.id);

  if (user) {
   io.to(user.room).emit("message", {
    user: "Admin",
    profileimg: user.profileimg,
    text: `${user.name} has left.`,
   });
   io
    .to(user.room)
    .emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
  }

  delete videoUsers[socket.id];
 });

 socket.emit("yourID", socket.id);
 io.sockets.emit("allUsers", videoUsers);

 socket.on("name", (name, id) => {
  console.log(name);
 });

 socket.on("callUser", (data) => {
  io
   .to(data.userToCall)
   .emit("hey", { signal: data.signalData, from: data.from });
 });

 socket.on("acceptCall", (data) => {
  io.to(data.to).emit("callAccepted", data.signal);
 });
});

server.listen(process.env.PORT || 5002, () =>
 console.log(`Server has started.. PORT 5002`)
);
