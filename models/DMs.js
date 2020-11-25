const mongoose = require('mongoose')

const DMSchema = mongoose.Schema({
    messages: [],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
})

module.exports = mongoose.model('dm', DMSchema)
