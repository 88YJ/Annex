import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../../pages/authentication/context'
import { useServerState, useServerDispatch, loadJoinedServers } from '../../../pages/server/context'
import { useTransition, animated } from 'react-spring'

import './NavServers.css'

export const NavServers = () => {
    const { isLoggedIn } = useAuthState()
    const { joinedServersList } = useServerState()

    const serverDispatch = useServerDispatch()

    const transition = useTransition(joinedServersList, (Servers) => Servers._id, {
        from: { opacity: 0, marginLeft: -75 },
        enter: { opacity: 1, marginLeft: 0 },
        leave: { opacity: 0, height: 0 },
    })

    useEffect(() => {
        if (isLoggedIn) {
            loadJoinedServers(serverDispatch)
        }
    }, [isLoggedIn, serverDispatch])

    return (
        <div className='Servers_Container'>
            <ul className='Servers_List_Joined'>
                {transition.map(({ item, key, props }) => (
                    <animated.div key={key} style={props} className='animatedDivs'>
                        <Link to={`/server/${item._id}/landing`}>
                            <li className='banner' style={{ backgroundImage: `url(${item.img})` }}>
                                <div
                                    className='profilepicture'
                                    style={{
                                        backgroundImage: `url('${item.img}')`,
                                        marginLeft: '3px',
                                    }}
                                />

                                <p className='Tertiary-Header' style={{ background: 'rgb(0,0,0,.5)' }}>
                                    {item.name}
                                </p>
                            </li>
                        </Link>
                    </animated.div>
                ))}
            </ul>
        </div>
    )
}
