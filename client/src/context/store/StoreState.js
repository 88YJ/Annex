import React, { useReducer } from 'react';
import StoreContext from './storeContext';
import storeReducer from './storeReducer';
import { GET_STORE_GAMES } from '../types';
import Axios from 'axios';

const StoreState = (props) => {
 const initialState = {
  storegames: [],
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

 return (
  <StoreContext.Provider
   value={{
    storegames: state.storegames,
    getStoreGames,
   }}
  >
   {props.children}
  </StoreContext.Provider>
 );
};

export default StoreState;
