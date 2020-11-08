import React, { useEffect } from 'react';

import { ChannelList } from './ChannelList';
import { FriendList } from './FriendList';
import { GameList } from './GameList';
import { ServerUserList } from './ServerUserList';
import { StreamChat } from './StreamChat';
import { SHOW_RIGHT_SIDEBAR, SHOW_LEFT_SIDEBAR } from './context/types';
import { useSideBarState } from './context';

import { useProfileDispatch, useProfileState, getFriends, findOwnedGames } from '../../pages/profile/context';

export const SideBar = (props) => {
  const { LeftChannellist, LeftFriends, RightGames, RightUserlist, RightStreamChat } = useSideBarState();

  const { FriendsLoaded, ownedGamesLoaded } = useProfileState();
  const profileDispatch = useProfileDispatch();

  useEffect(() => {
    if (!FriendsLoaded) {
      getFriends(profileDispatch);
    }
  }, [FriendsLoaded, profileDispatch]);
  useEffect(() => {
    if (!ownedGamesLoaded) {
      findOwnedGames(profileDispatch);
    }
  }, [ownedGamesLoaded, profileDispatch]);

  const { type } = props;

  switch (type) {
    case SHOW_LEFT_SIDEBAR:
      if (LeftFriends) {
        return (
          <>
            <FriendList />
          </>
        );
      } else if (LeftChannellist) {
        return (
          <>
            <ChannelList />
          </>
        );
      }
      break;
    case SHOW_RIGHT_SIDEBAR:
      if (RightGames) {
        return (
          <>
            <GameList />
          </>
        );
      } else if (RightUserlist) {
        return <ServerUserList />;
      } else if (RightStreamChat) {
        return <StreamChat />;
      }
      break;
    default:
      return null;
  }
};
