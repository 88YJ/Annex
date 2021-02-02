const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    img: {
        type: String,
        default: undefined,
        required: false,
    },
    message: {
        type: String,
        default: undefined,
        required: false,
    },
    comments: [],
    likes: {
        type: Number,
        default: 0,
    },
    shares: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('posts', PostSchema)
