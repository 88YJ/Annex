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
        default: undefined,
    },
    profileBanner: {
        type: String,
        default: 'https://easyhitch.com.co/wp-content/uploads/2016/10/background_easy-hitch4-1200x480.jpg',
    },
    backgroundPicture: {
        type: String,
        default: undefined,
    },
    location: {
        type: String,
        default: 'The Void..',
    },
    bio: {
        type: String,
        default: 'This user has not setup a bio yet..',
    },
    profileLevel: {
        type: Number,
        default: 0,
    },
    profileComments: [],
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
    directMessages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'directmessages',
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
            default: '#45A29E',
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
