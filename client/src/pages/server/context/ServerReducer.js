import { LOAD_CURRENT_SERVER, LOAD_USER_JOINED_SERVERS, LOAD_SERVER_USERLIST, LOAD_SERVER_CHANNELLIST, LOAD_CURRENT_CHANNEL } from './types';

export const initialState = {
  joinedServersList: [],
  currentServer: undefined,
  channelList: [],
  currentChannel: undefined,
  userList: [],
  loading: true,
};

export const ServerReducer = (initialState, action) => {
  switch (action.type) {
    case LOAD_USER_JOINED_SERVERS:
      return {
        ...initialState,
        joinedServersList: action.payload,
        loading: false,
      };
    case LOAD_CURRENT_SERVER:
      return {
        ...initialState,
        currentServer: action.payload,
        loading: false,
      };
    case LOAD_SERVER_USERLIST:
      return {
        ...initialState,
        userList: action.payload,
        loading: false,
      };
    case LOAD_SERVER_CHANNELLIST:
      return {
        ...initialState,
        channelList: action.payload,
        loading: false,
      };
    case LOAD_CURRENT_CHANNEL:
      return {
        ...initialState,
        currentChannel: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
