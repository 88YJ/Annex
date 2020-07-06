const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const User = require('../models/User');
const Server = require('../models/Servers');
const Game = require('../models/Games');
const StoreGames = require('../models/StoreGames');

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
 '/',
 [
  check('name', 'Please enter Name').not().isEmpty(),
  check('email', 'Please enter a valid Email').isEmail(),
  check(
   'password',
   'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
 ],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
   let user = await User.findOne({ email });

   if (user) {
    return res.status(400).json({ msg: 'User already exists' });
   }
   user = new User({
    name,
    email,
    password,
   });

   const salt = await bcrypt.genSalt(10);

   user.password = await bcrypt.hash(password, salt);

   await user.save();

   const payload = {
    user: {
     id: user.id,
    },
   };

   jwt.sign(
    payload,
    config.get('jwtSecret'),
    {
     expiresIn: 999999,
    },
    (err, token) => {
     if (err) throw err;
     res.json({ token });
    }
   );
  } catch (err) {
   console.error(err.message);
   res.status(500).send('ServerErr');
  }
 }
);

//Update User's game list
router.put('/myGames/:id', auth, async (req, res) => {
 console.log(req.params);
 try {
  let updatedUser = await User.findByIdAndUpdate(req.user.id, {
   $addToSet: { myGames: req.params.id },
  });
  res.json(updatedUser);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

//Get user games
router.get('/myGames/get', auth, async (req, res) => {
 try {
  const currentUser = await User.findById(req.user.id);
  const { myGames } = currentUser;

  let games = [];
  for (const id of myGames) {
   const game = await StoreGames.findById(id);
   const gameInfoObject = {
    _id: game._id,
    name: game.name,
    img: game.img,
    backgroundimg: game.backgroundimg,
    wideimg: game.wideimg,
    banner: game.banner,
   };
   games.push(gameInfoObject);
  }
  console.log(games);
  res.json(games);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

//Update User's server list
router.put('/:id', auth, async (req, res) => {
 try {
  let updatedUser = await User.findByIdAndUpdate(req.user.id, {
   $addToSet: { serverList: req.params.id },
  });
  res.json(updatedUser);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

//Send friend request
router.put('/sendfriendrequest/:id', auth, async (req, res) => {
 try {
  let requestSender = await User.findByIdAndUpdate(req.user.id, {
   $addToSet: { pendingFriendRequests: req.params.id },
  });

  let requestReceiver = await User.findByIdAndUpdate(req.params.id, {
   $addToSet: { incomingFriendRequests: req.user.id },
  });

  res.json(requestSender);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

//Accept friend request
router.put('/acceptfriendrequest/:id', auth, async (req, res) => {
 try {
  let currentUser = await User.findByIdAndUpdate(req.user.id, {
   $addToSet: { friendList: req.params.id },
   $pull: { incomingFriendRequests: req.params.id },
  });

  let friendToAdd = await User.findByIdAndUpdate(req.params.id, {
   $addToSet: { friendList: req.user.id },
   $pull: { pendingFriendRequests: req.user.id },
  });

  res.json(friendToAdd);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

router.get('/friendrequests', auth, async (req, res) => {
 try {
  const currentUser = await User.findById(req.user.id);
  const { incomingFriendRequests } = currentUser;

  let incomingRequests = [];

  for (const id of incomingFriendRequests) {
   const profile = await User.findById(id);
   const profileInfoObject = {
    _id: id,
    name: profile.name,
    email: profile.email,
    profilePicture: profile.profilePicture,
    profileBanner: profile.profileBanner,
    screenShots: profile.screenShots,
   };
   incomingRequests.push(profileInfoObject);
  }

  res.json(incomingRequests);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

router.get('/friends', auth, async (req, res) => {
 try {
  const currentUser = await User.findById(req.user.id);
  const { friendList } = currentUser;

  let friends = [];

  for (const id of friendList) {
   const profile = await User.findById(id);
   const profileInfoObject = {
    _id: id,
    name: profile.name,
    email: profile.email,
    profilePicture: profile.profilePicture,
    profileBanner: profile.profileBanner,
    screenShots: profile.screenShots,
   };
   friends.push(profileInfoObject);
  }

  res.json(friends);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

//Get server users
router.get('/:server_id', auth, async (req, res) => {
 try {
  const currentServer = await Server.findById(req.params.server_id);
  const { userList } = currentServer;

  let users = [];
  for (const id of userList) {
   const user = await User.findById(id);
   const userInfoObject = {
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
    profileBanner: user.profileBanner,
    screenShots: user.screenShots,
    _id: user._id,
   };
   users.push(userInfoObject);
  }

  res.json(users);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

//Getting profiles
router.get('/', auth, async (req, res) => {
 try {
  const allProfiles = await User.find();

  let profileInfoArray = [];

  allProfiles.forEach((user) => {
   const {
    _id,
    name,
    email,
    profilePicture,
    profileBanner,
    backgroundPicture,
    screenShots,
   } = user;
   const profileInfoObject = {
    _id: _id,
    name: name,
    email: email,
    profilePicture: profilePicture,
    profileBanner: profileBanner,
    backgroundPicture: backgroundPicture,
    screenShots: screenShots,
   };
   profileInfoArray.push(profileInfoObject);
  });
  res.json(profileInfoArray);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});
//Getting profiles
router.get('/profile/:id', auth, async (req, res) => {
 try {
  const profile = await User.findById(req.params.id);

  const {
   name,
   backgroundPicture,
   profilePicture,
   profileBanner,
   screenShots,
   _id,
  } = profile;

  const profileInfo = {
   _id: _id,
   name: name,
   backgroundPicture: backgroundPicture,
   profilePicture: profilePicture,
   profileBanner: profileBanner,
   screenShots: screenShots,
  };

  res.json(profileInfo);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

module.exports = router;
