const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Server = require('../models/Servers');

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res) => {
 try {
  const servers = await Server.find({ user: req.user.id }).sort({ date: -1 });
  res.json(servers);
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

  const { name, img } = req.body;

  try {
   const newServer = new Server({
    name,
    img,
    user: req.user.id,
   });

   const server = await newServer.save();

   res.json(server);
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server Err');
  }
 }
);

module.exports = router;
