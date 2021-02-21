import React, { useState } from 'react'
import { ProfileActivity } from './ProfileActivity'
import { ProfileComments } from './ProfileComments'
import { ProfileStats } from './ProfileStats'
import { ProfileScreenShots } from './ProfileScreenShots'

import Activity from '@material-ui/icons/LocalActivityOutlined'
import Stats from '@material-ui/icons/BarChartOutlined'
import Games from '@material-ui/icons/GamesOutlined'
import Inventory from '@material-ui/icons/BusinessCenterOutlined'
import Achievements from '@material-ui/icons/EmojiEventsOutlined'
import ScreenShots from '@material-ui/icons/DynamicFeedOutlined'
import Reviews from '@material-ui/icons/ReceiptOutlined'
import Artwork from '@material-ui/icons/ArtTrackOutlined'
import Groups from '@material-ui/icons/GroupWorkOutlined'
import Friends from '@material-ui/icons/GroupOutlined'

export const ProfileBody = () => {
    const [type, setType] = useState('activity')

    return (
        <>
            <div className='profile-Tabs'>
                <div onClick={() => setType('activity')} className='Profile_Tabs'>
                    <Activity />
                    Activity
                </div>

                <div onClick={() => setType('stats')} className='Profile_Tabs'>
                    <Stats />
                    Stats
                </div>

                <div onClick={() => setType('games')} className='Profile_Tabs'>
                    <Games />
                    Games
                </div>

                <div onClick={() => setType('inventory')} className='Profile_Tabs'>
                    <Inventory />
                    Inventory
                </div>

                <div onClick={() => setType('achievements')} className='Profile_Tabs'>
                    <Achievements />
                    Achievements
                </div>

                <div onClick={() => setType('screenshots')} className='Profile_Tabs'>
                    <ScreenShots />
                    Screenshots
                </div>

                <div onClick={() => setType('reviews')} className='Profile_Tabs'>
                    <Reviews />
                    Reviews
                </div>

                <div onClick={() => setType('artwork')} className='Profile_Tabs'>
                    <Artwork />
                    Artwork
                </div>

                <div onClick={() => setType('groups')} className='Profile_Tabs'>
                    <Groups />
                    Groups
                </div>

                <div onClick={() => setType('friends')} className='Profile_Tabs'>
                    <Friends />
                    Friends
                </div>
            </div>
            <div className='profile-Body-Center'>
                <div>
                    {type === 'activity' ? <ProfileActivity /> : null}
                    {type === 'stats' ? <ProfileStats /> : null}
                    {type === 'screenshots' ? <ProfileScreenShots /> : null}
                </div>

                <ProfileComments />
            </div>
        </>
    )
}
