const mongoose = require('mongoose')

const MessageContainerSchema = mongoose.Schema({
    messages: [],
    owners: [],
})

module.exports = mongoose.model('messagecontainer', MessageContainerSchema)
