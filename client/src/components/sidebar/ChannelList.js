import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useServerState, useServerDispatch, loadServerChannelList, loadCurrentVoiceChannel } from '../../pages/server/context'
import { useModalDispatch, useModalState, showModalWithAddChannel, showModalWithEditServer } from '../modal/context'
import { useAuthState } from '../../pages/authentication/context'
import PlusIcon from '../../images/PlusIcon.png'
import MenuArrow from '../../images/MenuArrow.png'
import DefaultProfilePicture from '../../images/DefaultProfile.png'

export const ChannelList = () => {
    const { currentServer, channelList, currentTextChannel } = useServerState()
    const { user } = useAuthState()
    const serverDispatch = useServerDispatch()
    const modalDispatch = useModalDispatch()
    const { show } = useModalState()
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        if (show) {
            setMenu(false)
        }
    }, [show])

    useEffect(() => {
        if (currentServer) {
            loadServerChannelList(serverDispatch, currentServer)
        }
    }, [currentServer, serverDispatch])

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
                    {channelList.map((channel) =>
                        !channel.voiceChannel ? (
                            currentTextChannel && channel._id === currentTextChannel._id ? (
                                <li key={channel.name}>
                                    <Link to={`/server/${currentServer._id}/${channel._id}`} className='Primary-Header Secondary-Background'>
                                        # {channel.name}
                                    </Link>
                                </li>
                            ) : (
                                <li key={channel.name}>
                                    <Link to={`/server/${currentServer._id}/${channel._id}`} className='Secondary-Header'>
                                        # {channel.name}
                                    </Link>
                                </li>
                            )
                        ) : null
                    )}
                    <li style={{ marginLeft: '0px' }}>
                        <p className='Primary-Header'>________________________</p>
                    </li>
                    {channelList.map((channel) =>
                        channel.voiceChannel ? (
                            <li key={channel.name}>
                                <Link onClick={() => handleVoiceChannelJoin(channel)} to='#' className='Secondary-Header'>
                                    {'< '}
                                    {channel.name}
                                </Link>
                                <ul className='channelUserlist'>
                                    {channel.userList.map((user) => (
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
                        ) : null
                    )}
                    {currentServer.owner === user._id ? (
                        <li style={{ marginTop: '3px', paddingBottom: '4px', cursor: 'pointer' }} key='addChannel'>
                            <div className='NavIcons' style={{ backgroundImage: `url(${PlusIcon})` }} onClick={() => showModalWithAddChannel(modalDispatch)} />
                        </li>
                    ) : null}
                </ul>
            </div>
        )
    }

    return <div>Loading...</div>
}
