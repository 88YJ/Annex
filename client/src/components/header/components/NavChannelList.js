import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useServerState, useServerDispatch, loadServerChannelList, loadCurrentVoiceChannel } from '../../../pages/server/context'
import { VoiceChat } from '../../sidebar/VoiceChat'
import DefaultProfilePicture from '../../../images/DefaultProfile.png'
import { useTransition, animated } from 'react-spring'
import VoiceIcon from '@material-ui/icons/VolumeUpOutlined'

import './NavChannelList.css'

export const NavChannelList = () => {
    const { currentServerID, channelList, currentTextChannel, currentServer } = useServerState()
    const serverDispatch = useServerDispatch()

    const transition = useTransition(channelList, (Channels) => Channels._id, {
        from: { opacity: 0, marginLeft: -100 },
        enter: { opacity: 1, marginLeft: 0 },
        leave: { opacity: 0, height: 0 },
    })

    useEffect(() => {
        if (currentServerID) {
            loadServerChannelList(serverDispatch, currentServer, true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentServerID, serverDispatch])

    const handleVoiceChannelJoin = (channel) => {
        try {
            loadCurrentVoiceChannel(serverDispatch, channel)
        } catch (error) {
            console.error(error)
        }
    }
    if (currentServer) {
        return (
            <>
                <div className='Nav-L-Sidebar-Serverchannels'>
                    <h3 className='globalHeader Border-Bottom-1PX Server_Headers' style={{ color: 'white' }}>
                        {currentServer.name}
                    </h3>
                    <ul>
                        <li style={{ marginLeft: '0px' }}>
                            <Link to={`/server/${currentServer._id}/landing`} className='Primary-Header'>
                                Landing Page
                            </Link>
                        </li>
                        {transition.map(({ item, key, props }) => (
                            <animated.div key={key} style={props} className='animatedDivs'>
                                {!item.voiceChannel ? (
                                    <li key={item.name}>
                                        <Link to={`/server/${currentServer._id}/${item._id}`} className='Secondary-Header'>
                                            # {item.name}
                                        </Link>
                                    </li>
                                ) : null}
                            </animated.div>
                        ))}
                        <li style={{ marginLeft: '0px' }}>
                            <p className='Primary-Header'>________________________</p>
                        </li>
                        {transition.map(({ item, key, props }) => (
                            <animated.div key={key} style={props} className='animatedDivs'>
                                {item.voiceChannel ? (
                                    <li key={item.name}>
                                        <Link onClick={() => handleVoiceChannelJoin(item)} to='#' className='Secondary-Header'>
                                            <VoiceIcon />
                                            {item.name}
                                        </Link>
                                        <ul className='channelUserlist'>
                                            {item.userList.map((user) => (
                                                <Link to={`/profile/${user._id}`} key={user._id}>
                                                    <li className='Primary-Header' style={{ marginLeft: '8px' }}>
                                                        <div
                                                            className='NavIcons'
                                                            style={{
                                                                backgroundImage: `url(${user.profilePicture ? user.profilePicture : DefaultProfilePicture})`,
                                                                height: '25px',
                                                                width: '25px',
                                                            }}
                                                        />
                                                        {user.name}
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </li>
                                ) : null}
                            </animated.div>
                        ))}
                        <li>
                            <VoiceChat />
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    return null
}
