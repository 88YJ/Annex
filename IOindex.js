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

let broadcaster;

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
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
   io
    .to(user.room)
    .emit("allUsers", { room: user.room, users: getUsersInRoom(user.room) });
  }

  delete videoUsers[socket.id];
 });

 if (!videoUsers[socket.id]) {
  videoUsers[socket.id] = socket.id;
 }

 socket.on("joinvoice", ({ name, room, profileimg }, callback) => {
  let filterUser = getUsersInRoom(room).filter((user) => user.id === socket.id);
  if (filterUser[0]) {
   return;
  }

  const { user } = addUser({ id: socket.id, name, profileimg, room });

  socket.emit("yourID", user.id);
  socket.join(user.room);

  io.to(user.room).emit("allUsers", {
   room: user.room,
   users: getUsersInRoom(user.room),
   newUser: user.id,
  });
  //io.to(user.room).emit('newUser', { userid: user.id });
 });

 socket.emit("yourID", socket.id);

 socket.on("name", (name, id) => {
  console.log("hi there" + name);
 });

 socket.on("callUser", (data) => {
  console.log("hopefully it works");
  const user = getUser(socket.id);
  io.to(data.userToCall).emit("hey", { signal: data.signalData, from: user });
 });

 socket.on("acceptCall", (data) => {
  console.log("data to" + data.to);
  io.to(data.to).emit("callAccepted", data.signal);
 });

 //CONNECT AND DISCONECT
 socket.on("broadcaster", () => {
  broadcaster = socket.id; //Getting ahold of broadcaster id
  socket.broadcast.emit("broadcaster");
 });

 socket.on("viewer", (id) => {
  socket.to(broadcaster).emit("viewer", socket.id, id); //Seding viewer socket id to broadcaster
 });

 socket.on("disconnect", () => {
  console.log("Socket disconnected");
  socket.to(broadcaster).emit("disconnectPeer", socket.id);
 });

 //SEND AND RECIEVE OFFER/ANSWER
 socket.on("offer", (id, message, broadcaster) => {
  socket.to(id).emit("offer", socket.id, message, broadcaster);
 });

 socket.on("answer", (id, message) => {
  socket.to(id).emit("answer", socket.id, message);
 });

 socket.on("candidate", (id, message) => {
  socket.to(id).emit("candidate", socket.id, message);
 });
});

server.listen(process.env.PORT || 5002, () =>
 console.log(`Server has started.. PORT 5002`)
);
