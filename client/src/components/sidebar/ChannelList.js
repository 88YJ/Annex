import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useServerState, useServerDispatch, loadServerChannelList, loadCurrentVoiceChannel } from '../../pages/server/context'
import { useModalDispatch, useModalState, showModalWithAddChannel, showModalWithEditServer } from '../modal/context'
import { useAuthState } from '../../pages/authentication/context'
import PlusIcon from '../../images/PlusIcon.png'
import { VoiceChat } from './VoiceChat'
import MenuArrow from '../../images/MenuArrow.png'
import DefaultProfilePicture from '../../images/DefaultProfile.png'
import { useTransition, animated } from 'react-spring'

export const ChannelList = () => {
    const { currentServerID, channelList, currentTextChannel, currentServer } = useServerState()
    const { user } = useAuthState()
    const serverDispatch = useServerDispatch()
    const modalDispatch = useModalDispatch()
    const { show } = useModalState()
    const [menu, setMenu] = useState(false)

    const transition = useTransition(channelList, (Channels) => Channels._id, {
        from: { opacity: 0, marginLeft: -100 },
        enter: { opacity: 1, marginLeft: 0 },
        leave: { opacity: 0, height: 0 },
    })

    useEffect(() => {
        if (show) {
            setMenu(false)
        }
    }, [show])

    useEffect(() => {
        if (currentServerID) {
            loadServerChannelList(serverDispatch, currentServer, true)
        }
    }, [currentServerID, currentServer, serverDispatch])

    const handleVoiceChannelJoin = (channel) => {
        try {
            loadCurrentVoiceChannel(serverDispatch, channel)
        } catch (error) {
            console.error(error)
        }
    }

    if (currentServer) {
        return (
            <div className='L-Sidebar-Serverchannels'>
                <h3 className='globalHeader Tertiary-Background Primary-Header Border-Bottom-1PX'>
                    {currentServer.name}
                    <div
                        className='profile-Options'
                        style={{
                            backgroundImage: `url(${MenuArrow})`,
                            position: 'absolute',
                            top: '-4px',
                            left: '285px',
                            height: '25px',
                            width: '25px',
                            transform: `${menu ? 'scale(1, 1)' : 'scale(1, -1)'}`,
                        }}
                        onClick={() => (menu ? setMenu(false) : setMenu(true))}
                    />

                    {menu ? (
                        <ul className='server-Options-Submenu'>
                            {currentServer.owner === user._id ? (
                                <li>
                                    <button
                                        className='globalbutton'
                                        style={{ height: 'auto', width: '96%' }}
                                        onClick={() => showModalWithEditServer(modalDispatch)}
                                    >
                                        Edit
                                    </button>
                                </li>
                            ) : null}
                            <li>
                                <button className='globalbutton' style={{ height: 'auto', width: '96%' }}>
                                    Invite Friends
                                </button>
                            </li>
                            <li>
                                <button className='globalbutton' style={{ height: 'auto', width: '96%' }}>
                                    Notification Settings
                                </button>
                            </li>
                            {currentServer.owner === user._id ? (
                                <li>
                                    <button className='globalbutton' style={{ height: 'auto', width: '96%', color: 'red' }}>
                                        Delete Server
                                    </button>
                                </li>
                            ) : (
                                <li>
                                    <button className='globalbutton' style={{ height: 'auto', width: '96%', color: 'red' }}>
                                        Leave Server
                                    </button>
                                </li>
                            )}
                        </ul>
                    ) : null}
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
                                currentTextChannel && item._id === currentTextChannel._id ? (
                                    <li key={item.name}>
                                        <Link to={`/server/${currentServer._id}/${item._id}`} className='Primary-Header Secondary-Background'>
                                            # {item.name}
                                        </Link>
                                    </li>
                                ) : (
                                    <li key={item.name}>
                                        <Link to={`/server/${currentServer._id}/${item._id}`} className='Secondary-Header'>
                                            # {item.name}
                                        </Link>
                                    </li>
                                )
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
                                        {'< '}
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
                    {currentServer.owner === user._id ? (
                        <li style={{ marginTop: '3px', paddingBottom: '4px', cursor: 'pointer' }} key='addChannel'>
                            <div className='NavIcons' style={{ backgroundImage: `url(${PlusIcon})` }} onClick={() => showModalWithAddChannel(modalDispatch)} />
                        </li>
                    ) : null}
                    <li>
                        <VoiceChat />
                    </li>
                </ul>
            </div>
        )
    }

    return <div>Loading...</div>
}
