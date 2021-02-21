import React from 'react'
import { Link } from 'react-router-dom'
import DefaultProfilePicture from '../../../images/DefaultProfile.png'
import { useProfileState } from '../../../pages/profile/context'
import { useTransition, animated } from 'react-spring'

import './NavFriendList.css'

export const NavFriendList = () => {
    const { Friends } = useProfileState()

    const transition = useTransition(Friends, (Friends) => Friends._id, {
        from: { opacity: 0, marginLeft: -75 },
        enter: { opacity: 1, marginLeft: 0 },
        leave: { opacity: 0, height: 0 },
    })

    return (
        <>
            <div className='L-Sidebar-Friendlist'>
                <div className='Friendlist-Friends'>
                    <ul>
                        {transition.map(({ item, key, props }) => (
                            <animated.div key={key} style={props} className='animatedDivs'>
                                {item.onlineStatus && (
                                    <li key={key} className='banner' style={{ backgroundImage: `url(${item.profileBanner})` }}>
                                        <div
                                            className='profilepicture'
                                            style={{
                                                backgroundImage: `url('${item.profilePicture ? item.profilePicture : DefaultProfilePicture}')`,
                                                marginLeft: '3px',
                                            }}
                                        />
                                        <Link to='#'>
                                            <p className='Tertiary-Header' style={{ background: 'rgb(0,0,0,.5)' }}>
                                                {item.name}
                                            </p>
                                        </Link>
                                        <div className='Friendlist-Submenu'>
                                            <ul>
                                                <li>
                                                    <Link to={`/profile/${item._id}`} className='Nav_Friends_Buttons'>
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/directchat/${item._id}`} className='Nav_Friends_Buttons'>
                                                        Message
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )}
                            </animated.div>
                        ))}
                        {transition.map(({ item, key, props }) => (
                            <animated.div key={key} style={props} className='animatedDivs'>
                                {!item.onlineStatus && (
                                    <li key={key} className='banner offlineFriends' style={{ backgroundImage: `url(${item.profileBanner})` }}>
                                        <div
                                            className='profilepicture'
                                            style={{
                                                backgroundImage: `url('${item.profilePicture ? item.profilePicture : DefaultProfilePicture}')`,
                                                marginLeft: '3px',
                                            }}
                                        />
                                        <Link to='#'>
                                            <p className='Tertiary-Header' style={{ background: 'rgb(0,0,0,.5)' }}>
                                                {item.name}
                                            </p>
                                        </Link>
                                        <div className='Friendlist-Submenu'>
                                            <ul>
                                                <li>
                                                    <Link to={`/profile/${item._id}`} className='Nav_Friends_Buttons'>
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/directchat/${item._id}`} className='Nav_Friends_Buttons'>
                                                        Message
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )}
                            </animated.div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
