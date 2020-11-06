const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const socketIO = require('socket.io');
const http = require('http');
//const User = require('./models/User');

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
    const userInfo = {
      socketId: socket.id,
      userData: {
        userId: userId,
        friendList: friendList,
      },
    };
    UserManager.push(userInfo);
    friendList.forEach((element) => io.to(element).emit('FriendUpdate', userId));
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
      //setOnlineStatus(false, User[0].userData.userId);
      User[0].userData.friendList.forEach((element) => io.to(element).emit('FriendUpdate', User[0].userData.userId));
    }

    //.forEach((element) => io.to(element).emit('FriendUpdate', userId));

    socket.broadcast.emit('voice-chat:remove-user', {
      socket: socket.id,
    });
  });
});

function updateserver(id) {
  const active = db
    .collection('servers')
    .find({ _id: ObjectId(id._id) })
    .toArray((err, result) => {
      let server = {
        _id: result[0]._id,
        channelList: result[0].channelList,
      };
      result[0].userList.forEach((element) => io.to(element).emit('ServerUpdate', server));
    });
}

// function setOnlineStatus(Online, userId) {
//   let yay = User.findByIdAndUpdate(ObjectId(userId), {
//     name: '2B Clutch',
//   });
//   console.log(yay);
// }

server.listen(process.env.PORT || 5002, () => console.log(`Server has started.. PORT 5002`));
