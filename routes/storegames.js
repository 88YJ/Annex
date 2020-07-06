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
  const { name, img, backgroundimg, wideimg, banner } = req.body;

  try {
   const newGame = new StoreGames({
    name,
    img,
    backgroundimg,
    wideimg,
    banner,
   });

   const game = await newGame.save();

   res.json(game);
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server Err');
  }
 }
);

router.get('/gamepage/:id', auth, async (req, res) => {
 try {
  const game = await StoreGames.findById(req.params.id);

  console.log(game);

  const { name, img, backgroundimg, wideimg, banner, _id } = game;

  const gameInfo = {
   name: name,
   img: img,
   backgroundimg: backgroundimg,
   wideimg: wideimg,
   banner: banner,
   _id: _id,
  };

  res.json(gameInfo);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

//Getting user games
router.get('/mygames/:id', auth, async (req, res) => {
 try {
  const game = await StoreGames.findById(req.params.id);

  const { name, img, backgroundimg, wideimg, banner, _id } = game;

  const gameInfo = {
   name: name,
   img: img,
   backgroundimg: backgroundimg,
   wideimg: wideimg,
   banner: banner,
   _id: _id,
  };

  res.json(gameInfo);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Err');
 }
});

module.exports = router;
