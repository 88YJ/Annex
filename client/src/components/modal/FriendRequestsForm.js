import React, { useEffect } from 'react'
import { style } from '../../css/CustomStyling'
import { useProfileState, useProfileDispatch, getIncomingFriendRequests, acceptFriendRequest } from '../../pages/profile/context'

export const FriendRequestsForm = () => {
    const { incomingRequests } = useProfileState()
    const profileDispatch = useProfileDispatch()

    useEffect(() => {
        getIncomingFriendRequests(profileDispatch)
    }, [profileDispatch])

    return (
        <>
            <div className='profile-Friendrequests'>
                <h2 style={{ color: `${style.primaryHeader}` }}>Friend Requests</h2>
                <ul>
                    {incomingRequests.map((request, i) => (
                        <li
                            key={i}
                            className='banner'
                            style={{
                                backgroundImage: `url(${request.profileBanner})`,
                            }}
                        >
                            <h4>{request.name}</h4>
                            <div
                                className='profilepicture'
                                style={{
                                    backgroundImage: `url(${request.profilePicture})`,
                                }}
                            />
                            <button
                                style={{ height: 'auto', width: 'auto' }}
                                className='globalbutton'
                                onClick={() => acceptFriendRequest(profileDispatch, request._id)}
                            >
                                Accept Request
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
