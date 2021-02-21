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
import LeftArrow from '@material-ui/icons/KeyboardArrowLeftOutlined'
import RightArrow from '@material-ui/icons/KeyboardArrowRightOutlined'

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
                            <div className='profile-Banner'>
                                <div className='profile-Header'>
                                    <div
                                        className='profile-DisplayPicture'
                                        style={
                                            CurrentProfile.profilePicture
                                                ? { backgroundImage: `url(${CurrentProfile.profilePicture})` }
                                                : { backgroundImage: `url(${DefaultProfilePicture})` }
                                        }
                                    />
                                    <div>
                                        <h1 className='Profile_Title'>{CurrentProfile.name}</h1>
                                        <h4 className='globalHeaderL Secondary-Header'>Location: {CurrentProfile.location}</h4>
                                        <p className='globalHeaderL Secondary-Header'>Desc: {CurrentProfile.bio}</p>
                                    </div>
                                    <div className='Profile_Header_R'>
                                        <h3 className='globalHeaderR Primary-Header'>Level: {CurrentProfile.profileLevel}</h3>
                                        <h3 className='globalHeaderR Primary-Header'>Years: 0</h3>
                                        <div className='Profile_Header_Options'>
                                            {menu ? (
                                                <>
                                                    <button className='profileButton' onClick={() => showModalWithEditProfile(modalDipatch)}>
                                                        Edit Profile
                                                    </button>
                                                    <button className='profileButton' onClick={() => showModalWithFriendRequests(modalDipatch)}>
                                                        Requests
                                                    </button>
                                                </>
                                            ) : null}
                                            {menu ? (
                                                <>
                                                    <RightArrow className='Profile_Arrows' onClick={() => (menu ? setMenu(false) : setMenu(true))} />
                                                </>
                                            ) : (
                                                <>
                                                    <LeftArrow className='Profile_Arrows' onClick={() => (menu ? setMenu(false) : setMenu(true))} />
                                                    Profile Options
                                                </>
                                            )}
                                        </div>
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
            <div
                className='profile-Background'
                style={{ backgroundImage: `url(${CurrentProfile && CurrentProfile.backgroundPicture ? CurrentProfile.backgroundPicture : DefaultBackground})` }}
            >
                <div className='profile-Film'>
                    <div className='profile-Master'>
                        <div className='profile-Header'>
                            <div
                                className='profile-DisplayPicture'
                                style={
                                    CurrentProfile.profilePicture
                                        ? { backgroundImage: `url(${CurrentProfile.profilePicture})` }
                                        : { backgroundImage: `url(${DefaultProfilePicture})` }
                                }
                            ></div>
                            <div>
                                <h1 className='Profile_Title'>{CurrentProfile.name}</h1>
                                <h4 className='globalHeaderL Secondary-Header'>Location: {CurrentProfile.location}</h4>
                                <p className='globalHeaderL Secondary-Header'>Desc: {CurrentProfile.bio}</p>
                            </div>
                            <div />
                            <div className='Profile_Header_R'>
                                <h3 className='globalHeaderR Primary-Header'>Level: {CurrentProfile.profileLevel}</h3>
                                <h3 className='globalHeaderR Primary-Header'>Years: 0</h3>
                                {CurrentProfile.onlineStatus ? (
                                    <h3 className='globalHeaderR Primary-Header'>Online</h3>
                                ) : (
                                    <h3 className='globalHeaderR Seconday-Header'>Offline</h3>
                                )}
                                <div className='Profile_Header_Options'>
                                    {menu ? (
                                        <>
                                            <button className='profileButton' onClick={() => sendFriendRequest(profileDispatch, CurrentProfile._id)}>
                                                Add Friend
                                            </button>
                                            <button className='profileButton' onClick={() => showModalWithFriendRequests(modalDipatch)}>
                                                Chat
                                            </button>
                                        </>
                                    ) : null}
                                    {menu ? (
                                        <>
                                            <RightArrow className='Profile_Arrows' onClick={() => (menu ? setMenu(false) : setMenu(true))} />
                                        </>
                                    ) : (
                                        <>
                                            <LeftArrow className='Profile_Arrows' onClick={() => (menu ? setMenu(false) : setMenu(true))} />
                                            Profile Options
                                        </>
                                    )}
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
        )
    }
}
