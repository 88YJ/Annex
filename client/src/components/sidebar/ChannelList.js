import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useServerState, useServerDispatch, loadServerChannelList, loadCurrentChannel } from '../../pages/server/context';

export const ChannelList = () => {
  const { currentServer, channelList } = useServerState();
  const serverDispatch = useServerDispatch();

  useEffect(() => {
    if (currentServer) {
      loadServerChannelList(serverDispatch, currentServer);
    }
  }, [currentServer, serverDispatch]);

  const handleChannelJoin = (channel) => {
    try {
      loadCurrentChannel(serverDispatch, channel);
    } catch (error) {
      console.error(error);
    }
  };

  if (currentServer) {
    return (
      <div className='L-Sidebar-Serverchannels'>
        <h3 className='globalHeader' style={{ background: 'black', color: 'red' }}>
          {currentServer.name}
        </h3>
        <ul>
          <li>
            <Link to={`/server/${currentServer._id}/landing`}>Landing Page</Link>
          </li>
          {channelList.map((channel) =>
            !channel.voiceChannel ? (
              <li key={channel.name}>
                <Link to={`/server/${currentServer._id}/${channel._id}`}>{channel.name}</Link>
              </li>
            ) : null
          )}
          <li>
            <p style={{ color: 'white' }}>________________________</p>
          </li>
          {channelList.map((channel) =>
            channel.voiceChannel ? (
              <li key={channel.name}>
                <Link onClick={() => handleChannelJoin(channel)} to='#'>
                  {channel.name}
                </Link>
              </li>
            ) : null
          )}
        </ul>
      </div>
    );
  }

  return <div>Loading...</div>;
};
