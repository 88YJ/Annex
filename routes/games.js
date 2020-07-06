const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Game = require('../models/Games');

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res) => {
 try {
  const Games = await Game.find({ user: req.user.id }).sort({ date: -1 });
  res.json(Games);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
 '/',
 [auth, [check('name', 'Name is required').not().isEmpty()]],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }

  const { name, img, backgroundimg, wideimg, gameid } = req.body;

  try {
   const newGame = new Game({
    name,
    img,
    backgroundimg,
    wideimg,
    gameid,
    user: req.user.id,
   });

   const game = await newGame.save();

   res.json(game);
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server Err');
  }
 }
);

module.exports = router;
