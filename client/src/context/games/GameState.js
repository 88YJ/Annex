import React, { useReducer } from 'react';
import uuid from 'uuid';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import { GET_GAMES } from '../types';
import Axios from 'axios';

const GameState = (props) => {
 const initialState = {
  games: null,
 };

 const [state, dispatch] = useReducer(gameReducer, initialState);

 //Get Games
 const getGames = async () => {
  try {
   const res = await Axios.get('/api/games');

   dispatch({ type: GET_GAMES, payload: res.data });
  } catch (err) {
   console.log('no games to display');
  }
 };

 return (
  <GameContext.Provider
   value={{
    games: state.games,
    getGames,
   }}
  >
   {props.children}
  </GameContext.Provider>
 );
};

export default GameState;
