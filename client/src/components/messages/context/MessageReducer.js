import { UPDATE_STREAM_MESSAGES, CLEAR_STREAM_MESSAGES, SET_MESSAGE, UPDATE_CHANNEL_MESSAGES, CLEAR_CHANNEL_MESSAGES, UPDATE_DIRECT_MESSAGES, CLEAR_DIRECT_MESSAGES } from './types';

export const initialState = {
  StreamMessages: [],
  ChannelMessages: [],
  DirectMessages: [],
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
      case UPDATE_DIRECT_MESSAGES:
      return {
        ...initialState,
        DirectMessages: [...initialState.DirectMessages, action.payload],
      };
      case CLEAR_DIRECT_MESSAGES:
      return {
        ...initialState,
        DirectMessages: [],
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
