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
  joinedServers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'servers',
    },
  ],
  profilePicture: {
    type: String,
    default: 'https://www.digitalconfectioners.com/wp-content/uploads/2016/11/dc-default-profile.png',
  },
  profileBanner: {
    type: String,
    default: 'https://easyhitch.com.co/wp-content/uploads/2016/10/background_easy-hitch4-1200x480.jpg',
  },
  backgroundPicture: {
    type: String,
    default: undefined,
  },
  friendList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  incomingFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  pendingFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  ownedGames: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'games',
    },
  ],
  screenShots: [
    {
      type: String,
      ref: 'users',
    },
  ],
  onlineStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('user', UserSchema);
