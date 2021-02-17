import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'

//Component imports
import { ServerList } from './ServerList'
import { SubMenu } from './SubMenu'

//Import images
import PlusIcon from '../../images/PlusIcon.png'
import SearchIcon from '../../images/SearchIcon.png'
import StreamIcon from '../../images/StreamIcon.png'
import CartIcon from '../../images/CartIcon.png'
import DefaultProfilePicture from '../../images/DefaultProfile.png'

//Context
import { useSideBarDispatch, showGames } from '../../components/sidebar/context'
import { useModalDispatch, showModalWithAddServer } from '../modal/context'
import { useAuthState } from '../../pages/authentication/context'

import './Nav.css'

//Import Types
//import { SHOW_SHOP_SUBMENU, SHOW__HOME_SUBMENU, SHOW_STREAM_SUBMENU } from './types/types'
import { SHOW_SHOP_SUBMENU, SHOW__HOME_SUBMENU } from './types/types'

export const Header = () => {
    const sidebarDispatch = useSideBarDispatch()
    const { user, isLoggedIn } = useAuthState()
    const modalDispatch = useModalDispatch()

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
                        <div
                            className='NavIcons'
                            style={
                                user.profilePicture ? { backgroundImage: `url(${user.profilePicture})` } : { backgroundImage: `url(${DefaultProfilePicture})` }
                            }
                        />
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
                    {/* <SubMenu type={SHOW_STREAM_SUBMENU} /> */}
                </li>
                <li onClick={() => changesidebar()}>
                    <Link to='/search'>
                        <div className='NavIcons' style={{ backgroundImage: `url(${SearchIcon})` }} />
                    </Link>
                </li>
                <li
                    className='Border-Bottom-1PX'
                    style={{ marginTop: '3px', paddingBottom: '4px', cursor: 'pointer' }}
                    key='addServer'
                    onClick={() => showModalWithAddServer(modalDispatch)}
                >
                    <div className='NavIcons' style={{ backgroundImage: `url(${PlusIcon})` }} />
                </li>
            </Fragment>
        )
    } else {
        navigationLinks = <Redirect to='/login' />
    }
    return (
        <div className='Nav'>
            <ul>
                {navigationLinks}
                <ServerList />
            </ul>
            <div className='NavSubMenu'></div>
        </div>
    )
}
