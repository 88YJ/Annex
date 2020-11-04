import React from 'react';
import { ChannelList } from './ChannelList';
import { SHOW_RIGHT_SIDEBAR, SHOW_LEFT_SIDEBAR } from './context/types';
import { useSideBarState } from './context';

export const SideBar = (props) => {
  const { LeftChannellist, LeftFriends, RightGames, RightUserlist } = useSideBarState();

  const { type } = props;

  switch (type) {
    case SHOW_LEFT_SIDEBAR:
      if (LeftFriends) {
        return (
          <>
            <div>Loading..</div>
          </>
        );
      } else if (LeftChannellist) {
        return (
          <>
            <ChannelList />
          </>
        );
      }

    case SHOW_RIGHT_SIDEBAR:
      if (RightGames) {
        return <div>Loading..</div>;
      } else if (RightUserlist) {
        return <div>Loading..</div>;
      }

    default:
      return null;
  }
};
