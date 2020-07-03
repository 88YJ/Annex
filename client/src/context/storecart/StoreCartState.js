import React, { useReducer } from 'react';
import StoreCartContext from './storecartContext';
import storecartReducer from './storecartReducer';
import { DISPLAY_CART_SIDEBAR, HIDE_CART_SIDEBAR, ADD_TO_CART } from '../types';
import Axios from 'axios';

const StoreCartState = (props) => {
 const initialState = {
  gamescart: [],
  cartSidebar: false,
 };

 const [state, dispatch] = useReducer(storecartReducer, initialState);

 const config = {
  headers: {
   'Content-Type': 'application/json',
  },
 };

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
 const addToCart = async (gametoadd) => {
  try {
   dispatch({ type: ADD_TO_CART, payload: gametoadd });
  } catch (err) {
   console.log("Couldn't add to the cart");
  }
 };

 const buyGame = async (game) => {
  console.log(game);
  try {
   const res = await Axios.post('/api/games', game, config);
  } catch (err) {
   console.log('Failed to buy game');
  }
 };

 return (
  <StoreCartContext.Provider
   value={{
    gamescart: state.gamescart,
    cartSidebar: state.cartSidebar,
    displayCartSidebar,
    hideCartSidebar,
    addToCart,
    buyGame,
   }}
  >
   {props.children}
  </StoreCartContext.Provider>
 );
};

export default StoreCartState;
