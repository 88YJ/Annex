import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import { GET_GAMES, DISPLAY_GAMES_SIDEBAR, CURRENT_MY_GAME } from '../types';
import Axios from 'axios';

const GameState = (props) => {
 const initialState = {
  games: null,
  gamesSidebar: false,
  myGame: null,
 };

 const [state, dispatch] = useReducer(gameReducer, initialState);

 const config = {
  headers: {
   'Content-Type': 'application/json',
  },
 };

 const displayGamesSidebar = async () => {
  try {
   dispatch({ type: DISPLAY_GAMES_SIDEBAR });
  } catch (err) {
   console.log("Couldn't load server sidebars");
  }
 };

 //Get Games
 const getGames = async () => {
  try {
   const res = await Axios.get('/api/users/myGames/get');
   dispatch({ type: GET_GAMES, payload: res.data });
  } catch (err) {
   console.log('no games to display');
  }
 };

 const setMyGame = async (game) => {
  try {
   const res = await Axios.get(`/api/storegames/mygames/${game._id}`, config);
   console.log('gameid' + res.data.name);
   dispatch({ type: CURRENT_MY_GAME, payload: res.data });
  } catch (err) {
   console.log('no profiles to display');
  }
 };

 return (
  <GameContext.Provider
   value={{
    games: state.games,
    gamesSidebar: state.gamesSidebar,
    myGame: state.myGame,
    displayGamesSidebar,
    getGames,
    setMyGame,
   }}
  >
   {props.children}
  </GameContext.Provider>
 );
};

export default GameState;
