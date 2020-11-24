import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../pages/authentication/context'
import { style } from '../../css/CustomStyling'

//Component imports
import { ServerList } from './ServerList'
import { SubMenu } from './SubMenu'

//Import images
import PlusIcon from '../../images/PlusIcon.png'
import SearchIcon from '../../images/SearchIcon.png'
import StreamIcon from '../../images/StreamIcon.png'
import CartIcon from '../../images/CartIcon.png'

import { useProfileDispatch, getFriends } from '../../pages/profile/context'
import { useServerState, useServerDispatch, loadServerChannelList, loadServerUserList } from '../../pages/server/context'
import { useSideBarDispatch, showGames } from '../../components/sidebar/context'
import { useModalDispatch, showModalWithAddServer } from '../modal/context'

//Import Types
import { SHOW_SHOP_SUBMENU, SHOW__HOME_SUBMENU, SHOW_STREAM_SUBMENU } from './types/types'

import { useSocketState, useSocketDispatch } from '../socketManager'
import { connectSocket } from '../socketManager/socketActions'

export const Header = () => {
    const sidebarDispatch = useSideBarDispatch()
    const { user, isLoggedIn } = useAuthState()
    const profileDispatch = useProfileDispatch()
    const serverDispatch = useServerDispatch()
    const { currentServer } = useServerState()
    const socketDispatch = useSocketDispatch()
    const { socket } = useSocketState()
    const modalDispatch = useModalDispatch()

    useEffect(() => {
        if (!socket && user) {
            connectSocket(socketDispatch)
        }
    }, [socket, socketDispatch, user])

    useEffect(() => {
        if (socket && user) {
            socket.on('userIdRequest', async () => {
                socket.emit('returnId', user._id, user.friendList)
            })
            socket.on('FriendUpdate', async (data) => {
                getFriends(profileDispatch)
            })
        }
    }, [socket, user, profileDispatch])

    useEffect(() => {
        if (currentServer) {
            socket.on('ServerUpdate', async (data) => {
                if (data._id === currentServer._id) {
                    loadServerChannelList(serverDispatch, data)
                    console.log(currentServer._id + data)
                }
            })
        }
    }, [serverDispatch, currentServer, socket])

    useEffect(() => {
        if (currentServer) {
            socket.on('voice-chat:user-joined-chat', async (data) => {
                if (data._id === currentServer._id) {
                    loadServerChannelList(serverDispatch, data)
                    console.log(currentServer._id + data)
                }
            })
        }
    }, [serverDispatch, currentServer, socket])

    useEffect(() => {
        if (currentServer) {
            socket.on('ServerUserUpdate', async (data) => {
                if (data === currentServer._id) {
                    loadServerUserList(serverDispatch, currentServer)
                    console.log('serverupdate')
                }
            })
        }
    }, [serverDispatch, currentServer, socket])

    useEffect(() => {
        if (socket) {
            socket.on('stillLogged', async () => {
                socket.emit('respondLogged', user._id)
            })
        }
    }, [socket, user])

    let navigationLinks

    function changesidebar() {
        document.getElementsByTagName('div')[3].setAttribute('class', 'app-mainGrid')
        showGames(sidebarDispatch)
    }

    if (isLoggedIn) {
        navigationLinks = (
            <Fragment>
                <li onClick={() => changesidebar()}>
                    <Link to='/'>
                        <div className='NavIcons' style={{ backgroundImage: `url(${user.profilePicture})` }} />
                    </Link>
                    <SubMenu type={SHOW__HOME_SUBMENU} />
                </li>
                <li onClick={() => changesidebar()}>
                    <Link to='/shop'>
                        <div className='NavIcons' style={{ backgroundImage: `url(${CartIcon})` }} />
                    </Link>
                    <SubMenu type={SHOW_SHOP_SUBMENU} />
                </li>
                <li>
                    <Link to='/stream'>
                        <div className='NavIcons' style={{ backgroundImage: `url(${StreamIcon})` }} />
                    </Link>
                    <SubMenu type={SHOW_STREAM_SUBMENU} />
                </li>
                <li onClick={() => changesidebar()}>
                    <Link to='/'>
                        <div className='NavIcons' style={{ backgroundImage: `url(${SearchIcon})` }} />
                    </Link>
                </li>
                <li
                    style={{ marginTop: '3px', borderBottom: `${style.primaryHeader} 1px solid`, paddingBottom: '4px', cursor: 'pointer' }}
                    key='addServer'
                    onClick={() => showModalWithAddServer(modalDispatch)}
                >
                    <div className='NavIcons' style={{ backgroundImage: `url(${PlusIcon})` }} />
                </li>
            </Fragment>
        )
    } else {
        navigationLinks = (
            <Fragment>
                <li>
                    <Link to='/'>Dashoard</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </Fragment>
        )
    }
    return (
        <div className='Nav' style={{ borderRight: `${style.outLine} 2px solid` }}>
            <ul>
                {navigationLinks}
                <ServerList />
            </ul>
            <div className='NavSubMenu'></div>
        </div>
    )
}
