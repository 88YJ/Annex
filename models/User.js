const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    joinedServers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'servers',
        },
    ],
    profilePicture: {
        type: String,
        default: 'https://www.digitalconfectioners.com/wp-content/uploads/2016/11/dc-default-profile.png',
    },
    profileBanner: {
        type: String,
        default: 'https://easyhitch.com.co/wp-content/uploads/2016/10/background_easy-hitch4-1200x480.jpg',
    },
    backgroundPicture: {
        type: String,
        default: undefined,
    },
    friendList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    incomingFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    pendingFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    ownedGames: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'games',
        },
    ],
    screenShots: [
        {
            type: String,
            ref: 'users',
        },
    ],
    onlineStatus: {
        type: Boolean,
        default: false,
    },
    colorScheme: {
        primaryHeader: {
            type: String,
            default: '#66FCF1',
        },
        secondaryHeader: {
            type: String,
            default: '#C5C6C7',
        },
        tertiaryHeader: {
            type: String,
            default: '#FFFFFF',
        },
        outLine: {
            type: String,
            default: '#384d48',
        },
        secondaryOutline: {
            type: String,
            default: '#45A29',
        },
        activeOutline: {
            type: String,
            default: '#66FCF1',
        },
        tint: {
            type: String,
        },
        defaultBackground: {
            type: String,
            default: '#0B0C10',
        },
        primaryBackground: {
            type: String,
            default: '#000411',
        },
        secondaryBackground: {
            type: String,
            default: '#384d48',
        },
        tertiaryBackground: {
            type: String,
            default: '#000000',
        },
    },
})

module.exports = mongoose.model('user', UserSchema)
