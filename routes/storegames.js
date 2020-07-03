const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const StoreGames = require('../models/StoreGames');

router.get('/', async (req, res) => {
 try {
  const Games = await StoreGames.find();
  res.json(Games);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

router.post(
 '/',
 [[check('name', 'Name is required').not().isEmpty()]],
 async (req, res) => {
  const { name, img } = req.body;

  try {
   const newGame = new StoreGames({
    name,
    img,
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
