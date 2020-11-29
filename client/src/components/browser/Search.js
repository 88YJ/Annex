import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProfileDispatch, useProfileState, getProfiles, joinServer } from '../../pages/profile/context'
import { useServerDispatch, useServerState, loadAllServers, loadJoinedServers } from '../../pages/server/context'
import DefaultProfilePicture from '../../images/DefaultProfile.png'

export const SearchComponent = (props) => {
    const { type } = props
    const profileDispatch = useProfileDispatch()
    const { Profiles, ProfilesLoaded } = useProfileState()
    const serverDispatch = useServerDispatch()
    const { allServers, allServersLoaded } = useServerState()

    useEffect(() => {
        if (!ProfilesLoaded) {
            getProfiles(profileDispatch)
        }
        if (!allServersLoaded) {
            loadAllServers(serverDispatch)
        }

        // eslint-disable-next-line
    }, [profileDispatch, ProfilesLoaded, serverDispatch, allServersLoaded])

    function join(id) {
        joinServer(profileDispatch, id)
        setTimeout(function task() {
            loadJoinedServers(serverDispatch)
        }, 1000)
    }

    if (type === 'profile' && Profiles) {
        return (
            <>
                <ul>
                    {Profiles.map((item, i) => (
                        <Link to={`/profile/${item._id}`} key={i}>
                            <li
                                className='banner'
                                style={{
                                    backgroundImage: `url(${item.profileBanner})`,
                                }}
                            >
                                <div
                                    className='profilepicture'
                                    style={
                                        item.profilePicture
                                            ? {
                                                  backgroundImage: `url(${item.profilePicture})`,
                                                  border: 'black 3px solid',
                                              }
                                            : { backgroundImage: `url(${DefaultProfilePicture})`, border: 'black 3px solid' }
                                    }
                                ></div>
                                <h2 style={{ backgroundColor: 'rgb(0,0,0,.8)' }}>{item.name}</h2>
                            </li>
                        </Link>
                    ))}
                </ul>
            </>
        )
    } else if (allServers) {
        return (
            <>
                <ul>
                    {allServers.map((item, i) => (
                        <Link to={`/server/${item._id}/landing`} key={i}>
                            <li
                                className='banner'
                                style={{
                                    backgroundImage: `url(${item.img})`,
                                }}
                                onClick={() => join(item._id)}
                            >
                                <h2 style={{ backgroundColor: 'rgb(0,0,0,.8)' }}>{item.name}</h2>
                            </li>
                        </Link>
                    ))}
                </ul>
            </>
        )
    } else return null
}
