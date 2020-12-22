import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from './Carousel'
import { CAROUSEL_SCREENSHOT } from './types/types'
import { useProfileState, useProfileDispatch, sendFriendRequest } from '../../pages/profile/context'
import { useModalDispatch, useModalState, showModalWithEditProfile, showModalWithFriendRequests } from '../modal/context'
import { useAuthState } from '../../pages/authentication/context'
import { ProfileBody } from '../profile/ProfileBody'
import DefaultBackground from '../../images/DefaultBackgroundV2.png'
import DefaultProfilePicture from '../../images/DefaultProfile.png'
import MenuArrow from '../../images/MenuArrow.png'

export const Profile = () => {
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

    if (user._id === CurrentProfile._id) {
        return (
            <>
                <div
                    className='profile-Background'
                    style={{
                        backgroundImage: `url(${CurrentProfile && CurrentProfile.backgroundPicture ? CurrentProfile.backgroundPicture : DefaultBackground})`,
                    }}
                >
                    <div className='profile-Film'>
                        <div className='profile-Master'>
                            <div classame='profile-Banner'>
                                <div className='profile-Header'>
                                    <div clNassName='profile-DisplayPicture' style={CurrentProfile.profilePicture ? { backgroundImage: `url(${CurrentProfile.profilePicture})` } : { backgroundImage: `url(${DefaultProfilePicture})` }} />
                                    <div>
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
                                                        <button className='globalbutton' style={{ height: 'auto', width: '96%' }} onClick={() => showModalWithEditProfile(modalDipatch)}>
                                                            Edit Profile
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className='globalbutton' style={{ height: 'auto', width: '96%' }} onClick={() => showModalWithFriendRequests(modalDipatch)}>
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
                            </div>
                            <div className='profile-SubMaster'>
                                <Carousel type={CAROUSEL_SCREENSHOT} />
                                <div className='profile-Body'>
                                    <ProfileBody />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div className='profile-Background' style={{ backgroundImage: `url(${CurrentProfile && CurrentProfile.backgroundPicture ? CurrentProfile.backgroundPicture : DefaultBackground})` }}>
                <div className='profile-Film'>
                    <div className='profile-Master'>
                        <div className='profile-Header'>
                            <div className='profile-DisplayPicture' style={CurrentProfile.profilePicture ? { backgroundImage: `url(${CurrentProfile.profilePicture})` } : { backgroundImage: `url(${DefaultProfilePicture})` }}></div>
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
                                                <button className='globalbutton' style={{ height: 'auto', width: '95%' }} onClick={() => sendFriendRequest(profileDispatch, CurrentProfile._id)}>
                                                    Add Friend
                                                </button>
                                            </li>
                                            <li>
                                                <Link to={`/directchat/${CurrentProfile._id}`}>
                                                    <button className='globalbutton' style={{ height: 'auto', width: '95%' }}>
                                                        Chat
                                                    </button>
                                                </Link>
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
                                {CurrentProfile.onlineStatus ? <h3 className='globalHeaderR Primary-Header'>Online</h3> : <h3 className='globalHeaderR Seconday-Header'>Offline</h3>}
                            </div>
                        </div>
                        <div className='profile-SubMaster'>
                            <Carousel type={CAROUSEL_SCREENSHOT} />
                            <div className='profile-Body'>
                                <ProfileBody />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
