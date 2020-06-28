const mongoose = require("mongoose");

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
 serverList: {
  type: [mongoose.Schema.Types.ObjectId],
  ref: "servers",
 },
});

module.exports = mongoose.model("user", UserSchema);
