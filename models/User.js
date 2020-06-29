const mongoose = require('mongoose');

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
 serverList: [
  {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'servers',
  },
 ],
 profilePicture: {
  type: String,
  default:
   'https://www.digitalconfectioners.com/wp-content/uploads/2016/11/dc-default-profile.png',
 },
});

module.exports = mongoose.model('user', UserSchema);
