const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
const socketIO = require('socket.io')
const http = require('http')

const User = require('./models/User')
const Channel = require('./models/Channel')

let UserManager = []
let ChannelManager = []

const app = express()
app.use(router)

const connection_url = 'mongodb+srv://brand123:brand123@contactkeeper-edahp.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

const db = mongoose.connection

db.once('open', () => {
    console.log('DB Connected')

    const serverCollection = db.collection('servers')
    const changeServers = serverCollection.watch()
    changeServers.on('change', (change) => {
        updateserver(change.documentKey)
    })

    const userCollection = db.collection('users')
    const updatedUser = userCollection.watch()
    updatedUser.on('change', (change) => {
        updateUser(change.documentKey)
    })

    const channelCollection = db.collection('channels')
    const changeChannels = channelCollection.watch()
    changeChannels.on('change', (change) => {
        updateChannel(change.documentKey)
    })
})

const server = http.createServer(app)
const io = socketIO(server)

io.on('connect', (socket) => {
    socket.emit('userIdRequest')
    socket.on('returnId', async (userId, friendList) => {
        socket.join(userId)
        setOnlineStatus(true, userId)
        const userInfo = {
            socketId: socket.id,
            userData: {
                userId: userId,
                friendList: friendList,
            },
        }
        UserManager.push(userInfo)
    })

    socket.on('respondLogged', (user) => {
        setOnlineStatus(true, user)
    })

    socket.on('text-chat:send-direct', (message, user) => {
        socket.to(user).emit('text-chat:incoming-message', message)
        io.to(message.userId).emit('text-chat:incoming-message', message)
    })

    socket.on('leaveStreamChat', (channel) => {
        socket.leave(channel)
        socket.removeAllListeners(channel + 'sentMessage')
    })
    socket.on('joinStreamChat', (channel) => {
        socket.join(channel)

        socket.on(channel + 'sentMessage', (messageContent) => {
            io.sockets.in(channel).emit('recievedMessage', messageContent)
        })
    })

    socket.on('leaveChat', (channel) => {
        socket.leave(channel)
        socket.removeAllListeners(channel + 'sentMessage')
    })
    socket.on('joinChat', (channel) => {
        socket.join(channel)

        socket.on(channel + 'sentMessage', (messageContent) => {
            updateChannelMessages(channel, messageContent)
            console.log('message recieved on server')
            io.sockets.in(channel).emit('recievedMessage', messageContent)
        })
    })

    socket.on('voice-chat:join', ({ channel, user }) => {
        socket.join(channel)
        console.log(user + ' joined to channel: ' + channel)

        ChannelManager[socket.id] = channel

        updateChannelUserList(channel, user, false)
    })

    socket.on('voice-chat:call', (data) => {
        socket.to(data.to).emit('voice-chat:receiving-call', {
            offer: data.offer,
            from: data.from,
        })
    })

    socket.on('voice-chat:answer-call', (data) => {
        socket.to(data.to).emit('voice-chat:answer-recieved', {
            from: data.from,
            answer: data.answer,
        })
    })

    socket.on('voice-chat:ice-candidate', (data) => {
        socket.to(data.to).emit('voice-chat:incoming-candidate', {
            candidate: data.candidate,
            from: data.from,
        })
    })

    socket.on('disconnect', () => {
        socket.removeAllListeners('text-chat:send-direct')
        let user = UserManager.filter((user) => user.socketId === socket.id)

        if (user[0]) {
            setOnlineStatus(false, user[0].userData.userId)
            io.to(user[0].userData.userId).emit('stillLogged')

            if (ChannelManager[socket.id]) {
                updateChannelUserList(ChannelManager[socket.id], user[0].userData.userId, true)
            }
        }
    })
})

function updateserver(id) {
    db.collection('servers')
        .find({ _id: ObjectId(id._id) })
        .toArray((err, result) => {
            let serverInfo = {
                _id: result[0]._id,
                channelList: result[0].channelList,
            }
            result[0].userList.forEach((element) => io.to(element).emit('ServerUpdate', serverInfo))
        })
}

function updateServerUsers(id) {
    db.collection('servers')
        .find({ _id: ObjectId(id) })
        .toArray((err, server) => {
            server[0].userList.forEach((element) => io.to(element).emit('ServerUserUpdate', id))
        })
}

function updateUser(id) {
    db.collection('users')
        .find({ _id: ObjectId(id._id) })
        .toArray((err, result) => {
            if (result[0]) {
                //io.to(result[0]._id).emit('UpdateRequest')
                result[0].friendList.forEach((element) => io.to(element).emit('FriendUpdate'))
                result[0].joinedServers.forEach((element) => updateServerUsers(element))
            }
        })
}

function updateChannel(id) {
    db.collection('channels')
        .find({ _id: ObjectId(id._id) })
        .toArray((err, result) => {
            if (result[0].userList) {
                let users = result[0].userList
                result[0].userList.forEach((element) => io.to(element).emit('voice-chat:update-users', users))
                console.log(users)
            }
        })
}

async function setOnlineStatus(Online, userId) {
    if (Online) {
        await User.findByIdAndUpdate(userId, {
            onlineStatus: true,
        })
    } else {
        await User.findByIdAndUpdate(userId, {
            onlineStatus: false,
        })
    }
}

async function updateChannelUserList(channel, user, remove) {
    if (remove) {
        await Channel.findByIdAndUpdate(channel, {
            $pull: { userList: user },
        })
    } else {
        await Channel.findByIdAndUpdate(channel, {
            $addToSet: { userList: user },
        })
    }
}

async function updateChannelMessages(channel, messageContent) {
    await Channel.findByIdAndUpdate(channel, {
        $addToSet: { messages: messageContent },
    })
}

server.listen(process.env.PORT || 5002, () => console.log(`Server has started.. PORT 5002`))
