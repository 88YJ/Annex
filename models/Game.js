const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  backgroundimg: {
    type: String,
    required: true,
  },
  wideimg: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('game', GameSchema);
