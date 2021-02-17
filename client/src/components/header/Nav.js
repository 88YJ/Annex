import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuthState } from '../../pages/authentication/context'
import { useModalDispatch, showModalWithAddServer, showModalWithColorScheme } from '../modal/context'

import DefaultProfilePicture from '../../images/DefaultProfile.png'

import { NavFriendList } from './components/NavFriendList'
import { NavServers } from './components/NavServers'

import ServerFeed from '@material-ui/icons/DnsOutlined'
import Streaming from '@material-ui/icons/SubscriptionsOutlined'
import FriendsFeed from '@material-ui/icons/GroupOutlined'
import GameNews from '@material-ui/icons/NewReleasesOutlined'
import Events from '@material-ui/icons/EventNoteOutlined'
import Home from '@material-ui/icons/HomeOutlined'
import Store from '@material-ui/icons/ShoppingCartOutlined'
import Settings from '@material-ui/icons/SettingsApplicationsOutlined'
import Plus from '@material-ui/icons/AddCircleOutline'
import Search from '@material-ui/icons/SearchOutlined'

export const Nav = () => {
    const { user } = useAuthState()
    const modalDispatch = useModalDispatch()

    const [showFriends, setShowFriends] = useState(false)
    const [showServers, setShowServers] = useState(false)

    function clickServers() {
        setShowFriends(false)
        setShowServers(!showServers)
    }
    function clickFriends() {
        setShowFriends(!showFriends)
        setShowServers(false)
    }
    function clickElse() {
        setShowFriends(false)
        setShowServers(false)
    }

    return (
        <>
            <div className='Nav_sidebar_container'>
                {user !== undefined ? (
                    <div className='Nav_leftSidebar'>
                        <div className='banner Nav_banner' style={{ backgroundImage: `url(${user.profileBanner})` }}>
                            <div
                                className='profilepicture'
                                style={{
                                    backgroundImage: `url('${user.profilePicture ? user.profilePicture : DefaultProfilePicture}')`,
                                    marginLeft: '3px',
                                }}
                            />
                            <Link to={`/profile/${user._id}`}>
                                <p className='Tertiary-Header' style={{ background: 'rgb(0,0,0,.5)' }}>
                                    {user.name}
                                </p>
                            </Link>
                        </div>

                        <Link to='/' className='Nav_leftSidebar_Options' onClick={() => clickElse()}>
                            <Home />
                            <p>Home</p>
                        </Link>
                        <div className='Nav_leftSidebar_Options' onClick={() => clickFriends()}>
                            <FriendsFeed />
                            <p>Friends</p>
                        </div>

                        {showFriends && (
                            <>
                                <Link to='/search' className='Nav_leftSidebar_Options'>
                                    <Search />
                                    <p>Find Friends</p>
                                </Link>
                            </>
                        )}

                        {showFriends && <NavFriendList />}

                        <div className='Nav_leftSidebar_Options' onClick={() => clickServers()}>
                            <ServerFeed />
                            <p>Servers</p>
                        </div>

                        {showServers && (
                            <>
                                <div className='Nav_leftSidebar_Options' onClick={() => showModalWithAddServer(modalDispatch)}>
                                    <Plus />
                                    <p>Create A Server</p>
                                </div>
                                <Link to='/search' className='Nav_leftSidebar_Options'>
                                    <Search />
                                    <p>Find A Server</p>
                                </Link>
                            </>
                        )}

                        {showServers && <NavServers />}

                        <Link to='/stream' className='Nav_leftSidebar_Options' onClick={() => clickElse()}>
                            <Streaming />
                            <p>Streaming</p>
                        </Link>
                        <Link to='/shop' className='Nav_leftSidebar_Options' onClick={() => clickElse()}>
                            <Store />
                            <p>Store</p>
                        </Link>
                        <div className='Nav_leftSidebar_Options' onClick={() => clickElse()}>
                            <GameNews />
                            <p>Game News</p>
                        </div>
                        <div className='Nav_leftSidebar_Options' onClick={() => clickElse()}>
                            <Events />
                            <p>Events</p>
                        </div>
                        <div
                            className='Nav_leftSidebar_Options'
                            onClick={() => {
                                clickElse()
                                showModalWithColorScheme(modalDispatch)
                            }}
                        >
                            <Settings />
                            <p>Settings</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}
