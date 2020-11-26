const mongoose = require('mongoose')

const DMSchema = mongoose.Schema({
    messages: [
        {
            user: {},
            otherUserID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
            message: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'messagecontainers',
            },
            read: {
                type: Boolean,
                default: false,
            },
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
})

module.exports = mongoose.model('directmessage', DMSchema)
