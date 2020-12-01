import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useServerState, useServerDispatch, loadServerUserList } from '../../pages/server/context'
import DefaultProfilePicture from '../../images/DefaultProfile.png'

export const ServerUserList = () => {
    const { currentServerID, currentServer, userList } = useServerState()
    const serverDispatch = useServerDispatch()

    useEffect(() => {
        if (currentServerID) {
            loadServerUserList(serverDispatch, currentServerID)
        }
    }, [currentServerID, serverDispatch])

    if (currentServer) {
        return (
            <>
                <div className='R-Sidebar-ServerUserlist'>
                    <h3 className='globalHeader Tertiary-Background Primary-Header Border-Bottom-1PX'>Users:</h3>
                    <div className='R-Sidebar-ServerUsers'>
                        <ul>
                            {userList.map((user, i) =>
                                user.onlineStatus ? (
                                    <li key={i} className='banner' style={{ backgroundImage: `url(${user.profileBanner})` }}>
                                        <div
                                            className='profilepicture'
                                            style={{ backgroundImage: `url('${user.profilePicture ? user.profilePicture : DefaultProfilePicture}')` }}
                                        />
                                        <Link to={`/profile/${user._id}`}>
                                            <p className='Tertiary-Header' style={{ background: 'rgb(0,0,0,.5)' }}>
                                                {user.name}
                                            </p>
                                        </Link>
                                    </li>
                                ) : null
                            )}
                            {userList.map((user, i) =>
                                !user.onlineStatus ? (
                                    <li key={i} className='banner offlineFriends' style={{ backgroundImage: `url(${user.profileBanner})` }}>
                                        <div
                                            className='profilepicture'
                                            style={{ backgroundImage: `url('${user.profilePicture ? user.profilePicture : DefaultProfilePicture}')` }}
                                        />
                                        <Link to={`/profile/${user._id}`}>
                                            <p className='Tertiary-Header' style={{ background: 'rgb(0,0,0,.5)' }}>
                                                {user.name}
                                            </p>
                                        </Link>
                                    </li>
                                ) : null
                            )}
                        </ul>
                    </div>
                </div>
            </>
        )
    }

    return <div>Loading...</div>
}
