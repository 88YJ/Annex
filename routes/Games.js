const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const { check, validationResult } = require('express-validator');

//Database Model
const Game = require('../models/Game');
const User = require('../models/User');

//let createGameCheck = [middleware.isAuthenticated, [check('name', 'Name is required').not().isEmpty()]];

//Post Games On Store
router.post('/PostGame', async (req, res) => {
  const { name, img, backgroundimg, wideimg, banner } = req.body;

  try {
    const newGame = new Game({
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
});

//Get All Games
router.get('/FindAll', async (req, res) => {
  try {
    const game = await Game.find();
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Err');
  }
});

//Find Game
router.get('/FindGame/:id', middleware.isAuthenticated, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

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

//Update User's game list
router.put('/AddGame/:id', middleware.isAuthenticated, async (req, res) => {
  try {
    let updatedUser = await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { ownedGames: req.params.id },
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Err');
  }
});

//Get User Games
router.get('/CaptureGames', middleware.isAuthenticated, async (req, res) => {
  try {
    const { ownedGames } = await User.findById(req.user.id).select('ownedGames');
    let usergames = [];
    for (const id of ownedGames) {
      const game = await Game.findById(id);
      const gameInfoObject = {
        _id: game._id,
        name: game.name,
        img: game.img,
        backgroundimg: game.backgroundimg,
        wideimg: game.wideimg,
        banner: game.banner,
      };
      usergames.push(gameInfoObject);
    }
    res.json(usergames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Err');
  }
});

module.exports = router;
