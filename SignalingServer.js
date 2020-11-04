const express = require('express');
const router = express.Router();
const socketIO = require('socket.io');
const http = require('http');

const app = express();
app.use(router);

const server = http.createServer(app);
const io = socketIO(server);

io.on('connect', (socket) => {
  socket.on('voice-chat:join', (channel) => {
    socket.join(channel);
    console.log('Socket joined to channel: ' + channel);

    //Testing remove if not needed
    io.to(channel).emit('voice-chat:update-users', socket.id);
  });

  socket.on('voice-chat:call', (data) => {
    socket.to(data.to).emit('voice-chat:receiving-call', {
      offer: data.offer,
      socket: socket.id,
    });
  });

  socket.on('voice-chat:answer-call', (data) => {
    socket.to(data.to).emit('voice-chat:answer-recieved', {
      socket: socket.id,
      answer: data.answer,
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('voice-chat:remove-user', {
      socket: socket.id,
    });
  });
});

server.listen(process.env.PORT || 5002, () => console.log(`Server has started.. PORT 5002`));
