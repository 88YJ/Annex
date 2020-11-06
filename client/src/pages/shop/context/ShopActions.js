import { LOAD_STORE_GAMES, ADD_TO_CART, SET_STORE_GAMEPAGE } from './types';
import axios from 'axios';

const requestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function loadStoreGames(dispatch) {
  try {
    const response = await axios.get('/api/games/FindAll', requestConfig);
    dispatch({ type: LOAD_STORE_GAMES, payload: response.data });
    console.log('Found All Games');
  } catch (error) {
    console.error(error);
  }
}

export async function setCurrentGame(dispatch, Game) {
  try {
    const res = await axios.get(`/api/games/FindGame/${Game}`);
    dispatch({ type: SET_STORE_GAMEPAGE, payload: res.data });
  } catch (err) {
    console.log('no games to display');
  }
}

export async function addToCart(dispatch, Game) {
  try {
    const res = await axios.get(`/api/games/FindGame/${Game}`);
    dispatch({ type: ADD_TO_CART, payload: res.data });
  } catch (error) {
    console.log(error);
  }
}

export async function buyGame(dispatch, Game) {
  try {
    const res = await axios.put(`api/games/AddGame/${Game[0]._id}`, requestConfig);
  } catch (error) {
    console.error(error);
  }
}
