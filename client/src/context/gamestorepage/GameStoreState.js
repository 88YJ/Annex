import React, { useReducer, useContext } from 'react';
import GameStoreContext from './gamestoreContext';
import gamestoreReducer from './gamestoreReducer';
import { SET_STORE_GAME } from '../types';
import Axios from 'axios';

import Logo from '../../components/layout/Logo.jpg';

const GameStoreState = (props) => {
 const initialState = {
  gamepage: {},
 };
 const [state, dispatch] = useReducer(gamestoreReducer, initialState);

 // Set Current Profile
 const setCurrentGame = async (game) => {
  try {
   dispatch({ type: SET_STORE_GAME, payload: game });
  } catch (err) {
   console.log("Couldn't find server");
  }
 };

 return (
  <GameStoreContext.Provider
   value={{
    gamepage: state.gamepage,
    setCurrentGame,
   }}
  >
   {props.children}
  </GameStoreContext.Provider>
 );
};

export default GameStoreState;
