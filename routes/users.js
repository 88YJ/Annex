const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const User = require("../models/User");

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
 "/",
 [
  check("name", "Please enter Name").not().isEmpty(),
  check("email", "Please enter a valid Email").isEmail(),
  check(
   "password",
   "Please enter a password with 6 or more characters"
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
    return res.status(400).json({ msg: "User already exists" });
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
    config.get("jwtSecret"),
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
   res.status(500).send("ServerErr");
  }
 }
);

//Update User's server list
router.put("/:id", auth, async (req, res) => {
 try {
  let updatedUser = await User.findByIdAndUpdate(req.user.id, {
   $push: { serverList: req.params.id },
  });
  res.json(updatedUser);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Err");
 }
});

//Get server users
router.get("/:ids", auth, async (req, res) => {
 try {
  const userIdsList = req.params.ids.split(",");

  const userArray = await User.find({
   _id: { $in: userIdsList },
  });

  let userInfoArray = [];

  userArray.forEach((user) => {
   const { name, email } = user;
   const userInfoObject = {
    name: name,
    email: email,
   };
   userInfoArray.push(userInfoObject);
  });

  console.log(userInfoArray);

  res.json(userInfoArray);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Err");
 }
});

module.exports = router;
