const mongoose = require("mongoose");

const ServersSchema = mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 img: {
  type: String,
  required: true,
 },
 userList: [
  {
   type: mongoose.Schema.Types.ObjectId,
   ref: "users",
  },
 ],
 channelList: [
  {
   type: mongoose.Schema.Types.ObjectId,
   ref: "channels",
  },
 ],
 owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
 },
});

module.exports = mongoose.model("server", ServersSchema);
