import {
  SHOW_LEFT_SIDEBAR_CHANNELLIST,
  SHOW_LEFT_SIDEBAR_FRIENDS,
  SHOW_RIGHT_SIDEBAR_GAMES,
  SHOW_RIGHT_SIDEBAR_USERLIST,
  SHOW_RIGHT_SIDEBAR_STREAMCHAT,
} from './types';

export function showChannellist(dispatch) {
  try {
    dispatch({ type: SHOW_LEFT_SIDEBAR_CHANNELLIST });
    console.log('Left Side Bar Set (Channel-list)');
  } catch (error) {
    console.error(error);
  }
}

export function showFriends(dispatch) {
  try {
    dispatch({ type: SHOW_LEFT_SIDEBAR_FRIENDS });
    console.log('Left Side Bar Set (Friends)');
  } catch (error) {
    console.error(error);
  }
}

export function showGames(dispatch) {
  try {
    dispatch({ type: SHOW_RIGHT_SIDEBAR_GAMES });
    console.log('Right Side Bar Set (Games)');
  } catch (error) {
    console.error(error);
  }
}

export function showUserlist(dispatch) {
  try {
    dispatch({ type: SHOW_RIGHT_SIDEBAR_USERLIST });
    console.log('Right Side Bar Set (User-list)');
  } catch (error) {
    console.error(error);
  }
}

export function showStreamChat(dispatch) {
  try {
    dispatch({ type: SHOW_RIGHT_SIDEBAR_STREAMCHAT });
    console.log('Right Side Bar Set (StreamChat)');
  } catch (error) {
    console.log(error);
  }
}
