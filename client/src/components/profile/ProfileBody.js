import React, { useState } from 'react'
import { ProfileActivity } from './ProfileActivity'
import { ProfileComments } from './ProfileComments'
import { ProfileStats } from './ProfileStats'
import { ProfileScreenShots } from './ProfileScreenShots'

export const ProfileBody = () => {
    const [type, setType] = useState('activity')

    return (
        <>
            <div className='profile-Tabs'>
                <ul>
                    <li>
                        <h4 onClick={() => setType('activity')} className='globalHeader'>
                            Recent Activity
                        </h4>
                    </li>
                    <li>
                        <h4 onClick={() => setType('stats')} className='globalHeader'>
                            Stats
                        </h4>
                    </li>

                    <li>
                        <h4 onClick={() => setType('games')} className='globalHeader'>
                            Games
                        </h4>
                    </li>
                    <li>
                        <h4 onClick={() => setType('inventory')} className='globalHeader'>
                            Inventory
                        </h4>
                    </li>
                    <li>
                        <h4 onClick={() => setType('achievements')} className='globalHeader'>
                            Achievements
                        </h4>
                    </li>
                    <li>
                        <h4 onClick={() => setType('screenshots')} className='globalHeader'>
                            Screenshots
                        </h4>
                    </li>
                    <li>
                        <h4 onClick={() => setType('reviews')} className='globalHeader'>
                            Reviews
                        </h4>
                    </li>
                    <li>
                        <h4 onClick={() => setType('artwork')} className='globalHeader'>
                            Artwork
                        </h4>
                    </li>
                    <li>
                        <h4 onClick={() => setType('groups')} className='globalHeader'>
                            Groups
                        </h4>
                    </li>
                    <li>
                        <h4 onClick={() => setType('friends')} className='globalHeader'>
                            Friends
                        </h4>
                    </li>
                </ul>
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
