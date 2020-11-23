import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useServerState, useServerDispatch, loadServerChannelList, loadCurrentVoiceChannel } from '../../pages/server/context';
import { style } from '../../css/CustomStyling'

export const ChannelList = () => {
    const { currentServer, channelList, currentTextChannel } = useServerState()
    const serverDispatch = useServerDispatch()

    useEffect(() => {
        if (currentServer) {
            loadServerChannelList(serverDispatch, currentServer)
        }
    }, [currentServer, serverDispatch])

  const handleVoiceChannelJoin = (channel) => {
    try {
      loadCurrentVoiceChannel(serverDispatch, channel);
    } catch (error) {
      console.error(error);
    }
  }

    if (currentServer) {
        return (
            <div className='L-Sidebar-Serverchannels'>
                <h3
                    className='globalHeader'
                    style={{ background: `${style.tertiaryBackground}`, color: `${style.primaryHeader}`, borderBottom: `${style.secondaryOutLine} 1px solid` }}
                >
                    {currentServer.name}
                </h3>
                <ul>
                    <li style={{ marginLeft: '0px' }}>
                        <Link to={`/server/${currentServer._id}/landing`} style={{ color: `${style.primaryHeader}` }}>
                            Landing Page
                        </Link>
                    </li>
                    {channelList.map((channel) =>
                        !channel.voiceChannel ? (
                            currentTextChannel && channel._id === currentTextChannel._id ? (
                                <li key={channel.name}>
                                    <Link
                                        to={`/server/${currentServer._id}/${channel._id}`}
                                        style={{ color: `${style.primaryHeader}`, backgroundColor: `${style.secondaryBackground}` }}
                                    >
                                        # {channel.name}
                                    </Link>
                                </li>
                            ) : (
                                <li key={channel.name}>
                                    <Link to={`/server/${currentServer._id}/${channel._id}`} style={{ color: `${style.secondaryHeader}` }}>
                                        # {channel.name}
                                    </Link>
                                </li>
                            )
                        ) : null
                    )}
                    <li style={{ marginLeft: '0px' }}>
                        <p style={{ color: `${style.primaryHeader}` }}>________________________</p>
                    </li>
                    {channelList.map((channel) =>
                        channel.voiceChannel ? (
                            <li key={channel.name}>
                                <Link onClick={() => handleVoiceChannelJoin(channel)} to='#' style={{ color: `${style.secondaryHeader}` }}>
                                    {'< '}
                                    {channel.name}
                                </Link>
                                <ul>
                                  {channel.userList.map((user) =>
                                    <li key={user}>
                                      {user}
                                    </li>
                                  )}
                                </ul>
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
        )
    }

    return <div>Loading...</div>
}
