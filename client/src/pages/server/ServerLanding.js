import React, { useEffect } from 'react';
import { Channel } from './Channel';
import { useParams } from 'react-router';
import { useServerState, useServerDispatch, loadCurrentServer, loadCurrentTextChannel } from './context';
import { useSideBarDispatch, showChannellist, showUserlist } from '../../components/sidebar/context';

export const ServerLanding = () => {
  const { server_id, channel_id } = useParams();
  const { joinedServersList, loading, channelList } = useServerState();

  const serverDispatch = useServerDispatch();

  const sidebarDispatch = useSideBarDispatch();

  useEffect(() => {
    if (!loading) {
      let server = joinedServersList.filter((server) => server._id === server_id);
      loadCurrentServer(serverDispatch, server[0]);
    }
  }, [loading, serverDispatch, joinedServersList, server_id]);

  useEffect(() => {
    if (!loading) {
      let channel = channelList.filter((channel) => channel._id === channel_id);
      if (channel[0]) {
        loadCurrentTextChannel(serverDispatch, channel[0], server_id);
      } else {
        loadCurrentTextChannel(serverDispatch, undefined);
      }
    }
  }, [loading, serverDispatch, channelList, channel_id]);

  useEffect(() => {
    showChannellist(sidebarDispatch);
    showUserlist(sidebarDispatch);
  }, [sidebarDispatch]);

  return <Channel />;
};
