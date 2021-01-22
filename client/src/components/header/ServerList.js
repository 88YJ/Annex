import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../pages/authentication/context'
import { useServerState, useServerDispatch, loadJoinedServers } from '../../pages/server/context'

export const ServerList = () => {
    const { isLoggedIn } = useAuthState()
    const { joinedServersList } = useServerState()

    const serverDispatch = useServerDispatch()

    function changesidebar() {
        document.getElementsByTagName('div')[3].setAttribute('class', 'app-mainGrid')
    }

    useEffect(() => {
        if (isLoggedIn) {
            loadJoinedServers(serverDispatch)
        }
    }, [isLoggedIn, serverDispatch])

    return joinedServersList.map((server) => (
        <Link to={`/server/${server._id}/landing`} key={server._id} onClick={() => changesidebar()}>
            <li>
                <div className='NavIcons' style={{ backgroundImage: `url(${server.img})` }}></div>
            </li>
        </Link>
    ))
}
