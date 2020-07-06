import React, { useReducer } from 'react';
import StoreContext from './storeContext';
import storeReducer from './storeReducer';
import {
 GET_STORE_GAMES,
 DISPLAY_CART_SIDEBAR,
 HIDE_CART_SIDEBAR,
 ADD_TO_CART,
 SET_STORE_GAME,
} from '../types';
import Axios from 'axios';

const StoreState = (props) => {
 const config = {
  headers: {
   'Content-Type': 'application/json',
  },
 };

 const initialState = {
  storegames: [],
  gamescart: [],
  gamepage: {},
  cartSidebar: false,
 };

 const [state, dispatch] = useReducer(storeReducer, initialState);

 const getStoreGames = async () => {
  try {
   const res = await Axios.get('/api/storegames');
   dispatch({ type: GET_STORE_GAMES, payload: res.data });
  } catch (err) {
   console.log('no games to display');
  }
 };

 /////////////////////////////////////////////////////////Store Cart
 const displayCartSidebar = async () => {
  try {
   dispatch({ type: DISPLAY_CART_SIDEBAR });
  } catch (err) {
   console.log("Couldn't load cart sidebars");
  }
 };
 const hideCartSidebar = async () => {
  try {
   dispatch({ type: HIDE_CART_SIDEBAR });
  } catch (err) {
   console.log("Couldn't hide cart sidebars");
  }
 };
 const addToCart = async () => {
  try {
   dispatch({ type: ADD_TO_CART, payload: state.gamepage });
  } catch (err) {
   console.log("Couldn't add to the cart");
  }
 };

 const buyGame = async () => {
  try {
   const res = await Axios.put(
    `api/users/myGames/${state.gamescart[0].gameid}`,
    state.gamescart[0],
    config
   );
  } catch (err) {
   console.log('Failed to buy game');
  }
 };

 ////////////////////////////////////////////////Game Store
 // Set Current Game
 const setCurrentGame1 = async (game) => {
  console.log(game);
  try {
   dispatch({ type: SET_STORE_GAME, payload: game });
  } catch (err) {
   console.log("Couldn't find server");
  }
 };
 const setCurrentGame = async (game) => {
  try {
   console.log(game._id);
   const res = await Axios.get(`/api/storegames/gamepage/${game._id}`);
   dispatch({ type: SET_STORE_GAME, payload: res.data });
  } catch (err) {
   console.log('no games to display');
  }
 };

 return (
  <StoreContext.Provider
   value={{
    storegames: state.storegames,
    gamescart: state.gamescart,
    cartSidebar: state.cartSidebar,
    gamepage: state.gamepage,
    setCurrentGame,
    displayCartSidebar,
    hideCartSidebar,
    addToCart,
    buyGame,
    getStoreGames,
   }}
  >
   {props.children}
  </StoreContext.Provider>
 );
};

export default StoreState;
