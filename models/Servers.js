const mongoose = require('mongoose');

const ServersSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('server', ServersSchema);
