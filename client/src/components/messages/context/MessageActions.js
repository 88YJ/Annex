import { UPDATE_STREAM_MESSAGES, CLEAR_STREAM_MESSAGES, SET_MESSAGE, UPDATE_CHANNEL_MESSAGES, CLEAR_CHANNEL_MESSAGES, UPDATE_DIRECT_MESSAGES, CLEAR_DIRECT_MESSAGES } from './types';

export function updateStreamMessages(dispatch, message) {
  try {
    dispatch({ type: UPDATE_STREAM_MESSAGES, payload: message });
    console.log('Message Recieved..');
  } catch (error) {
    console.error(error);
  }
}

export function clearStreamMessages(dispatch) {
  try {
    dispatch({ type: CLEAR_STREAM_MESSAGES });
    console.log('Stream Messages Cleared');
  } catch (error) {
    console.error(error);
  }
}

export function updateChannelMessages(dispatch, message) {
  try {
    dispatch({ type: UPDATE_CHANNEL_MESSAGES, payload: message });
    console.log('Message Recieved..');
  } catch (error) {
    console.error(error);
  }
}

export function clearChannelMessages(dispatch) {
  try {
    dispatch({ type: CLEAR_CHANNEL_MESSAGES });
    console.log('Channel Messages Cleared');
  } catch (error) {
    console.error(error);
  }
}

export function setMessage(dispatch, message) {
  try {
    dispatch({ type: SET_MESSAGE, payload: message });
  } catch (error) {
    console.error(error);
  }
}

export function updateDirectMessages(dispatch, message) {
  try {
    dispatch({ type: UPDATE_DIRECT_MESSAGES, payload: message });
    console.log('Message Recieved..');
  } catch (error) {
    console.error(error);
  }
}

export function clearDirectMessages(dispatch) {
  try {
    dispatch({ type: CLEAR_DIRECT_MESSAGES });
    console.log('Direct Messages Cleared');
  } catch (error) {
    console.error(error);
  }
}