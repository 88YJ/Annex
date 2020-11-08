import { LOAD_STORE_GAMES, ADD_TO_CART, SET_STORE_GAMEPAGE, CLEAR_CART } from './types';

export const initialState = {
  storeGames: undefined,
  cart: [],
  gamePage: undefined,
  loading: true,
};

export const ShopReducer = (initialState, action) => {
  switch (action.type) {
    case LOAD_STORE_GAMES:
      return {
        ...initialState,
        storeGames: action.payload,
        loading: false,
      };
    case ADD_TO_CART:
      return {
        ...initialState,
        cart: [...initialState.cart, action.payload],
      };
    case SET_STORE_GAMEPAGE:
      return {
        ...initialState,
        gamePage: action.payload,
        gameLoading: false,
      };
    case CLEAR_CART:
      return {
        ...initialState,
        cart: [],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};