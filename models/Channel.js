const mongoose = require('mongoose')

const ChannelsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: 'TEXT',
    },
    customization: {
        icon: {
            type: String,
            default: undefined,
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'servers',
    },
    userList: {
        type: Array,
    },
    messages: {
        type: Array,
    },
    voiceChannel: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('channel', ChannelsSchema)
