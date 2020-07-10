const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const videoUsers = {};

let userarray = [];

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
 socket.on('join', ({ name, room, profileimg }, callback) => {
  const { error, user } = addUser({ id: socket.id, name, profileimg, room });

  if (error) return callback(error);
  socket.join(user.room);
  socket.broadcast.to(user.room).emit('message', {
   user: 'admin',
   profileimg: profileimg,
   text: `${user.name} has joined!`,
  });

  io
   .to(user.room)
   .emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

  callback();
 });

 socket.on('sendMessage', (message, callback) => {
  const user = getUser(socket.id);

  io.to(user.room).emit('message', {
   user: user.name,
   profileimg: user.profileimg,
   text: message,
  });

  callback();
 });

 socket.on('disconnect', () => {
  const user = removeUser(socket.id);

  if (user) {
   io.to(user.room).emit('message', {
    user: 'Admin',
    profileimg: user.profileimg,
    text: `${user.name} has left.`,
   });
   io
    .to(user.room)
    .emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
   io
    .to(user.room)
    .emit('allUsers', { room: user.room, users: getUsersInRoom(user.room) });
  }

  delete videoUsers[socket.id];
 });

 if (!videoUsers[socket.id]) {
  videoUsers[socket.id] = socket.id;
 }

 socket.on('joinvoice', ({ name, room, profileimg }, callback) => {
  const { user } = addUser({ id: socket.id, name, profileimg, room });

  socket.emit('yourID', user.id);
  socket.join(user.room);

  io.to(user.room).emit('allUsers', {
   room: user.room,
   users: getUsersInRoom(user.room),
   newUser: user.id,
  });
  //io.to(user.room).emit('newUser', { userid: user.id });

  console.log(getUsersInRoom(user.room));
 });

 socket.emit('yourID', socket.id);

 socket.on('name', (name, id) => {
  console.log('hi there' + name);
 });

 socket.on('callUser', (data) => {
  console.log('hopefully it works');
  const user = getUser(socket.id);
  io.to(data.userToCall).emit('hey', { signal: data.signalData, from: user });
 });

 socket.on('acceptCall', (data) => {
  console.log('data to' + data.to);
  io.to(data.to).emit('callAccepted', data.signal);
  ////////////////////////////////////////////////////////////////////////////////////////////////////Needs to be fixed
 });
});

server.listen(process.env.PORT || 5002, () =>
 console.log(`Server has started.. PORT 5002`)
);
