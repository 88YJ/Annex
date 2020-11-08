import { CAPTURE_FRIENDS, CAPTURE_PROFILES, LOAD_CURRENT_PROFILE, CAPTURE_GAMES, SET_OWNED_CURRENT_GAME } from './types';
import axios from 'axios';

const requestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getFriends(dispatch) {
  try {
    const response = await axios.get('/api/users/friends', requestConfig);
    dispatch({ type: CAPTURE_FRIENDS, payload: response.data });
    console.log('Captured Friends..');
  } catch (error) {
    console.log(error);
  }
}

export async function getProfiles(dispatch) {
  try {
    const response = await axios.get('/api/users/profile', requestConfig);
    dispatch({ type: CAPTURE_PROFILES, payload: response.data });
    console.log('Captured Profiles..');
  } catch (error) {
    console.log(error);
  }
}

export async function loadCurrentProfile(dispatch, profile) {
  try {
    dispatch({ type: LOAD_CURRENT_PROFILE, payload: profile });
    console.log('Profile Loaded..');
  } catch (error) {
    console.log(error);
  }
}

export async function findOwnedGames(dispatch) {
  try {
    const res = await axios.get(`/api/games/CaptureGames`);
    dispatch({ type: CAPTURE_GAMES, payload: res.data });
    console.log('Captured Profile Games..');
  } catch (error) {
    console.log(error);
  }
}

export async function loadOwnedCurrentGame(dispatch, Game) {
  try {
    const res = await axios.get(`/api/games/FindGame/${Game}`);
    dispatch({ type: SET_OWNED_CURRENT_GAME, payload: res.data });
    console.log('Captured Owned Current Game..');
  } catch (error) {
    console.log(error);
  }
}