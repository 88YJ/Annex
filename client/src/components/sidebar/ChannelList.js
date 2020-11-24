import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useServerState, useServerDispatch, loadServerChannelList, loadCurrentVoiceChannel } from '../../pages/server/context';
import { useModalDispatch, showModalWithAddChannel } from '../modal/context'
import { style } from '../../css/CustomStyling'
import PlusIcon from '../../images/PlusIcon.png'

export const ChannelList = () => {
    const { currentServer, channelList, currentTextChannel } = useServerState()
    const serverDispatch = useServerDispatch()
    const modalDispatch = useModalDispatch()

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
                                <ul className='channelUserlist'>
                                  {channel.userList.map((user) =>
                                    <Link to={`/profile/${user._id}`} key={user._id}>
                                      <li style={{color:`${style.primaryHeader}`, marginLeft:'8px'}} >
                                        <div className='NavIcons' style={{ backgroundImage: `url(${user.profilePicture})`, height:'25px', width:'25px' }} />{user.name}
                                      </li>
                                    </Link>
                                  )}
                                </ul>
                            </li>
                        ) : null
                    )}
                    <li style={{ marginTop: '3px', paddingBottom: '4px', cursor: 'pointer' }} key='addChannel' >
                        <div className='NavIcons' style={{ backgroundImage: `url(${PlusIcon})` }} onClick={() => showModalWithAddChannel(modalDispatch)} />
                    </li>
                </ul>
            </div>
        )
    }

    return <div>Loading...</div>
}
