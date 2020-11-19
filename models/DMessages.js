const mongoose = require('mongoose');

const DMessageSchema = mongoose.Schema({
  containerID: {
    type: String,
    required: true
  },
  messages: [],
});

module.exports = mongoose.model('dmessages', DMessageSchema);
