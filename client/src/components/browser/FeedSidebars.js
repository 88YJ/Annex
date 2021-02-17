import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../pages/authentication/context'
import DefaultProfilePicture from '../../images/DefaultProfile.png'

import ServerFeed from '@material-ui/icons/DnsOutlined'
import Streaming from '@material-ui/icons/SubscriptionsOutlined'
import FriendsFeed from '@material-ui/icons/GroupOutlined'
import GameNews from '@material-ui/icons/NewReleasesOutlined'
import Events from '@material-ui/icons/EventNoteOutlined'

export const FeedSidebars = () => {
    const { user } = useAuthState()
    return (
        <>
            <div className='feed_sidebar_container'>
                {user !== undefined ? (
                    <div className='feed_leftSidebar'>
                        <div className='banner feed_banner' style={{ backgroundImage: `url(${user.profileBanner})` }}>
                            <div
                                className='profilepicture'
                                style={{
                                    backgroundImage: `url('${user.profilePicture ? user.profilePicture : DefaultProfilePicture}')`,
                                    marginLeft: '3px',
                                }}
                            />
                            <Link to='#'>
                                <p className='Tertiary-Header' style={{ background: 'rgb(0,0,0,.5)' }}>
                                    {user.name}
                                </p>
                            </Link>
                        </div>
                        <div className='feed_leftSidebar_Options'>
                            <FriendsFeed />
                            <p>Friends</p>
                        </div>
                        <div className='feed_leftSidebar_Options'>
                            <ServerFeed />
                            <p>Servers</p>
                        </div>
                        <div className='feed_leftSidebar_Options'>
                            <Streaming />
                            <p>Streaming</p>
                        </div>
                        <div className='feed_leftSidebar_Options'>
                            <GameNews />
                            <p>Game News</p>
                        </div>
                        <div className='feed_leftSidebar_Options'>
                            <Events />
                            <p>Events</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}
