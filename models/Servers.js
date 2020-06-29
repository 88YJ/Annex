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
 owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
 },
});

module.exports = mongoose.model("server", ServersSchema);
