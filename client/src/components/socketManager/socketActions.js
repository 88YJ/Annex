import { CONNECT_SOCKET } from './types';
import io from 'socket.io-client';

const ENDPOINT = "https://signaling-dot-ultimate-karma-297923.wl.r.appspot.com";

export function connectSocket(dispatch) {
  try {
    let socket = io(ENDPOINT, {transports: ['websocket']});
    dispatch({ type: CONNECT_SOCKET, payload: socket });
    console.log('Socket connected successfully.');
  } catch (error) {
    console.error(error);
  }
}
