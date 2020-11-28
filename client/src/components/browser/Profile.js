import React, { useState, useEffect } from 'react'
import { Carousel } from './Carousel'
import { CAROUSEL_SCREENSHOT } from './types/types'
import { useProfileState, useProfileDispatch, sendFriendRequest } from '../../pages/profile/context'
import { useModalDispatch, useModalState, showModalWithEditProfile, showModalWithFriendRequests } from '../modal/context'
import { useAuthState } from '../../pages/authentication/context'
import DefaultBackground from '../../images/DefaultBackgroundV2.png'
import MenuArrow from '../../images/MenuArrow.png'

export const Profile = () => {
    let backgroundImage = DefaultBackground
    const { CurrentProfile } = useProfileState()
    const profileDispatch = useProfileDispatch()
    const { user } = useAuthState()
    const modalDipatch = useModalDispatch()
    const { show } = useModalState()

    const [menu, setMenu] = useState(false)

    useEffect(() => {
        if (show) {
            setMenu(false)
        }
    }, [show])

    if (CurrentProfile && CurrentProfile.backgroundPicture) {
        backgroundImage = CurrentProfile.backgroundPicture
    }

    if (user._id === CurrentProfile._id) {
        return (
            <>
                <div className='profile-Background' style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className='profile-Film'>
                        <div className='profile-Master'>
                            <div className='profile-Header'>
                                <div className='profile-DisplayPicture' style={{ backgroundImage: `url(${CurrentProfile.profilePicture})` }} />
                                <div style={{ color: 'white' }}>
                                    <h1 className='globalHeaderL Primary-Header' style={{ display: 'flex' }}>
                                        <div
                                            className='profile-Options'
                                            style={{
                                                backgroundImage: `url(${MenuArrow})`,
                                                transform: `${menu ? 'scale(1, 1)' : 'scale(1, -1)'}`,
                                            }}
                                            onClick={() => (menu ? setMenu(false) : setMenu(true))}
                                        />
                                        {CurrentProfile.name}

                                        {menu ? (
                                            <ul className='profile-Options-Submenu'>
                                                <li>
                                                    <button
                                                        className='globalbutton'
                                                        style={{ height: 'auto', width: '96%' }}
                                                        onClick={() => showModalWithEditProfile(modalDipatch)}
                                                    >
                                                        Edit
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className='globalbutton'
                                                        style={{ height: 'auto', width: '96%' }}
                                                        onClick={() => showModalWithFriendRequests(modalDipatch)}
                                                    >
                                                        Requests
                                                    </button>
                                                </li>
                                            </ul>
                                        ) : null}
                                    </h1>
                                    <h4 className='globalHeaderL Secondary-Header'>Location: {CurrentProfile.location}</h4>
                                    <p className='globalHeaderL Secondary-Header'>Desc: {CurrentProfile.bio}</p>
                                </div>
                                <div />
                                <div>
                                    <h3 className='globalHeaderR Primary-Header'>Level: {CurrentProfile.profileLevel}</h3>
                                    <h3 className='globalHeaderR Primary-Header'>Years: 0</h3>
                                </div>
                            </div>
                            <div className='profile-SubMaster'>
                                <Carousel type={CAROUSEL_SCREENSHOT} />
                                <div className='profile-Body'>
                                    <div className='profile-Tabs'>
                                        <ul>
                                            <li>
                                                <h2 className='globalHeader'>Online</h2>
                                            </li>
                                            <li>
                                                <h4 className='globalHeader'>Friends</h4>
                                            </li>
                                            <li>
                                                <h4 className='globalHeader'>Games</h4>
                                            </li>
                                            <li>
                                                <h4 className='globalHeader'>Inventory</h4>
                                            </li>
                                            <li>
                                                <h4 className='globalHeader'>Achievements</h4>
                                            </li>
                                            <li>
                                                <h4 className='globalHeader'>Screenshots</h4>
                                            </li>
                                            <li>
                                                <h4 className='globalHeader'>Reviews</h4>
                                            </li>
                                            <li>
                                                <h4 className='globalHeader'>Artwork</h4>
                                            </li>
                                            <li>
                                                <h4 className='globalHeader'>Groups</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='profile-Body-Center'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div className='profile-Background' style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className='profile-Film'>
                    <div className='profile-Master'>
                        <div className='profile-Header'>
                            <div className='profile-DisplayPicture' style={{ backgroundImage: `url(${CurrentProfile.profilePicture})` }}></div>
                            <div style={{ color: 'white' }}>
                                <h1 className='globalHeaderL Primary-Header' style={{ display: 'flex' }}>
                                    <div
                                        className='profile-Options'
                                        style={{
                                            backgroundImage: `url(${MenuArrow})`,
                                            transform: `${menu ? 'scale(1, 1)' : 'scale(1, -1)'}`,
                                        }}
                                        onClick={() => (menu ? setMenu(false) : setMenu(true))}
                                    />
                                    {CurrentProfile.name}

                                    {menu ? (
                                        <ul className='profile-Options-Submenu'>
                                            <li>
                                                <button
                                                    className='globalbutton'
                                                    style={{ height: 'auto', width: '95%' }}
                                                    onClick={() => sendFriendRequest(profileDispatch, CurrentProfile._id)}
                                                >
                                                    Add Friend
                                                </button>
                                            </li>
                                            <li>
                                                <button className='globalbutton' style={{ height: 'auto', width: '95%' }}>
                                                    Chat
                                                </button>
                                            </li>
                                        </ul>
                                    ) : null}
                                </h1>
                                <h4 className='globalHeaderL Secondary-Header'>Location: {CurrentProfile.location}</h4>
                                <p className='globalHeaderL Secondary-Header'>Desc: {CurrentProfile.bio}</p>
                            </div>
                            <div />
                            <div>
                                <h3 className='globalHeaderR Primary-Header'>Level: {CurrentProfile.profileLevel}</h3>
                                <h3 className='globalHeaderR Primary-Header'>Years: 0</h3>
                                {CurrentProfile.onlineStatus ? (
                                    <h3 className='globalHeaderR Primary-Header'>Online</h3>
                                ) : (
                                    <h3 className='globalHeaderR Seconday-Header'>Offline</h3>
                                )}
                            </div>
                        </div>
                        <div className='profile-SubMaster'>
                            <Carousel type={CAROUSEL_SCREENSHOT} />
                            <div className='profile-Body'>
                                <div className='profile-Tabs'>
                                    <ul>
                                        <li>
                                            <h2 className='globalHeader'>Online</h2>
                                        </li>
                                        <li>
                                            <h4 className='globalHeader'>Friends</h4>
                                        </li>
                                        <li>
                                            <h4 className='globalHeader'>Games</h4>
                                        </li>
                                        <li>
                                            <h4 className='globalHeader'>Inventory</h4>
                                        </li>
                                        <li>
                                            <h4 className='globalHeader'>Achievements</h4>
                                        </li>
                                        <li>
                                            <h4 className='globalHeader'>Screenshots</h4>
                                        </li>
                                        <li>
                                            <h4 className='globalHeader'>Reviews</h4>
                                        </li>
                                        <li>
                                            <h4 className='globalHeader'>Artwork</h4>
                                        </li>
                                        <li>
                                            <h4 className='globalHeader'>Groups</h4>
                                        </li>
                                    </ul>
                                </div>
                                <div className='profile-Body-Center'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
