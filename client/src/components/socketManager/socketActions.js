import { CONNECT_SOCKET } from './types';
import io from 'socket.io-client';

const ENDPOINT = ':5002';

export function connectSocket(dispatch) {
  try {
    let socket = io.connect(ENDPOINT);
    dispatch({ type: CONNECT_SOCKET, payload: socket });
    console.log('Socket connected successfully.');
  } catch (error) {
    console.error(error);
  }
}
