import { UPDATE_STREAM_MESSAGES, CLEAR_STREAM_MESSAGES, SET_MESSAGE, UPDATE_CHANNEL_MESSAGES, CLEAR_CHANNEL_MESSAGES } from './types';

export const initialState = {
  StreamMessages: [],
  ChannelMessages: [],
  message: '',
};

export const MessageReducer = (initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...initialState,
        message: action.payload,
      };
    case UPDATE_STREAM_MESSAGES:
      return {
        ...initialState,
        StreamMessages: [...initialState.StreamMessages, action.payload],
      };
    case CLEAR_STREAM_MESSAGES:
      return {
        ...initialState,
        StreamMessages: [],
      };
    case UPDATE_CHANNEL_MESSAGES:
      return {
        ...initialState,
        ChannelMessages: [...initialState.ChannelMessages, action.payload],
      };
    case CLEAR_CHANNEL_MESSAGES:
      return {
        ...initialState,
        ChannelMessages: [],
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
