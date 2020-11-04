import { CAPTURE_FRIENDS } from './types';
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
    console.log('Captured Friends');
  } catch (error) {
    console.log(error);
  }
}
