const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const socketIO = require('socket.io');
const http = require('http');
const User = require('./models/User');
const Server = require('./models/Server');

let UserManager = [];

const app = express();
app.use(router);

const connection_url = 'mongodb+srv://brand123:brand123@contactkeeper-edahp.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB Connected');

  const serverCollection = db.collection('servers');
  const changeServers = serverCollection.watch();
  changeServers.on('change', (change) => {
    updateserver(change.documentKey);
  });

  const userCollection = db.collection('users');
  const updatedUser = userCollection.watch();
  updatedUser.on('change', (change) => {
    updateUser(change.documentKey);
  });

  const channelCollection = db.collection('channels');
  const changeChannels = channelCollection.watch();
  changeChannels.on('change', (change) => {});
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connect', (socket) => {
  socket.emit('userIdRequest');
  socket.on('returnId', async (userId, friendList) => {
    socket.join(userId);
    setOnlineStatus(true, userId);
    const userInfo = {
      socketId: socket.id,
      userData: {
        userId: userId,
        friendList: friendList,
      },
    };
    UserManager.push(userInfo);
  });

  socket.on('respondLogged', (user) => {
    setOnlineStatus(true, user);
  });

  socket.on('leaveStreamChat', (channel) => {
    socket.leave(channel);
    socket.removeAllListeners(channel + 'sentMessage');
  });
  socket.on('joinStreamChat', (channel) => {
    socket.join(channel);

    socket.on(channel + 'sentMessage', (messageContent) => {
      io.sockets.in(channel).emit('recievedMessage', messageContent);
    });
  });

  socket.on('leaveChat', (channel) => {
    socket.leave(channel);
    socket.removeAllListeners(channel + 'sentMessage');
  });
  socket.on('joinChat', (channel) => {
    socket.join(channel);

    socket.on(channel + 'sentMessage', (messageContent) => {
      console.log('message recieved on server');
      io.sockets.in(channel).emit('recievedMessage', messageContent);
    });
  });

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
    let User = UserManager.filter((User) => User.socketId === socket.id);

    if (User[0]) {
      setOnlineStatus(false, User[0].userData.userId);
      io.to(User[0].userData.userId).emit('stillLogged');
    }

    socket.broadcast.emit('voice-chat:remove-user', {
      socket: socket.id,
    });
  });
});

function updateserver(id) {
  db.collection('servers')
    .find({ _id: ObjectId(id._id) })
    .toArray((err, result) => {
      let serverInfo = {
        _id: result[0]._id,
        channelList: result[0].channelList,
      };
      result[0].userList.forEach((element) => io.to(element).emit('ServerUpdate', serverInfo));
    });
}

function updateServerUsers(id) {
  db.collection('servers')
    .find({ _id: ObjectId(id) })
    .toArray((err, server) => {
      server[0].userList.forEach((element) => io.to(element).emit('ServerUserUpdate', id));
    });
}

function updateUser(id) {
  db.collection('users')
    .find({ _id: ObjectId(id._id) })
    .toArray((err, result) => {
      if (result[0]) {
        result[0].friendList.forEach((element) => io.to(element).emit('FriendUpdate'));
        result[0].joinedServers.forEach((element) => updateServerUsers(element));
      }
    });
}

async function setOnlineStatus(Online, userId) {
  if (Online) {
    await User.findByIdAndUpdate(userId, {
      onlineStatus: true,
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      onlineStatus: false,
    });
  }
}

server.listen(process.env.PORT || 5002, () => console.log(`Server has started.. PORT 5002`));
