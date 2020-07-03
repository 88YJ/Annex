const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Server = require("../models/Servers");
const Channel = require("../models/Channel");

//Get all channels
router.get("/all/:channel_ids", auth, async (req, res) => {
 try {
  const channelIdList = req.params.channel_ids.split(",");

  const channelArray = await Channel.find({
   _id: { $in: channelIdList },
  });

  let channelInfoArray = [];

  channelArray.forEach((channel) => {
   const { name, voiceChannel, customazation } = channel;
   const channelInfoObject = {
    name: name,
    voiceChannel: voiceChannel,
    customazation: customazation,
   };
   channelInfoArray.push(channelInfoObject);
  });

  console.log(channelInfoArray);

  res.json(channelInfoArray);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Err");
 }
});

//Get single channel TODO
router.get("/:channel_id", auth, async (req, res) => {
 try {
  const currentServer = await Server.findById(req.params.id);
  const { channelList } = currentServer;

  let channels = [];
  for (const id of channelList) {
   channels.push(await Channel.findById(id));
  }

  res.json(channels);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Err");
 }
});

//Post a new channel to the current server
router.post(
 "/",
 [auth, [check("name", "Name is required").not().isEmpty()]],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }

  const { name, voiceChannel, owner } = req.body;

  try {
   const newChannel = new Channel({
    name,
    voiceChannel,
    owner: owner,
   });

   const channel = await newChannel.save();
   let updatedServer = await Server.findByIdAndUpdate(owner, {
    $addToSet: { channelList: channel._id },
   });

   updatedServer.save();

   res.json(channel);
  } catch (err) {
   console.error(err.message);
   res.status(500).send("Server Err");
  }
 }
);

module.exports = router;
