const mongoose = require('mongoose');

const GamesSchema = mongoose.Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'users',
 },
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
 gameid: {
  type: String,
  required: true,
 },
});

module.exports = mongoose.model('game', GamesSchema);
