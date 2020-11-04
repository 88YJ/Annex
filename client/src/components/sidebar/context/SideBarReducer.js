import { SHOW_LEFT_SIDEBAR_CHANNELLIST, SHOW_LEFT_SIDEBAR_FRIENDS, SHOW_RIGHT_SIDEBAR_GAMES, SHOW_RIGHT_SIDEBAR_USERLIST } from './types';

export const initialState = {
  LeftChannellist: false,
  LeftFriends: true,
  RightGames: true,
  RightUserlist: false,
};

export const SideBarReducer = (initialState, action) => {
  switch (action.type) {
    case SHOW_LEFT_SIDEBAR_CHANNELLIST:
      return {
        ...initialState,
        LeftChannellist: true,
        LeftFriends: false,
      };
    case SHOW_LEFT_SIDEBAR_FRIENDS:
      return {
        ...initialState,
        LeftChannellist: false,
        LeftFriends: true,
      };
    case SHOW_RIGHT_SIDEBAR_GAMES:
      return {
        ...initialState,
        RightGames: true,
        RightUserlist: false,
      };
    case SHOW_RIGHT_SIDEBAR_USERLIST:
      return {
        ...initialState,
        RightGames: false,
        RightUserlist: true,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
