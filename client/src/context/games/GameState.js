import React, { useReducer, useContext } from "react";
import uuid from "uuid";
import GameContext from "./gameContext";
import gameReducer from "./gameReducer";
import { GET_GAMES, DISPLAY_GAMES_SIDEBAR } from "../types";
import Axios from "axios";

const GameState = (props) => {
 const initialState = {
  games: null,
  gamesSidebar: false,
 };

 const [state, dispatch] = useReducer(gameReducer, initialState);

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
   const res = await Axios.get("/api/games");
   dispatch({ type: GET_GAMES, payload: res.data });
  } catch (err) {
   console.log("no games to display");
  }
 };

 return (
  <GameContext.Provider
   value={{
    games: state.games,
    gamesSidebar: state.gamesSidebar,
    displayGamesSidebar,
    getGames,
   }}
  >
   {props.children}
  </GameContext.Provider>
 );
};

export default GameState;
