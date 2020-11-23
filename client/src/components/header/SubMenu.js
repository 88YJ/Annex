import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState, useAuthDispatch, logout } from '../../pages/authentication/context'
import { style } from '../../css/CustomStyling'

import { SHOW_SHOP_SUBMENU, SHOW__HOME_SUBMENU, SHOW_STREAM_SUBMENU } from './types/types'
import { SubMenuCart } from './SubMenuCart'

export const SubMenu = (props) => {
    const authDispatch = useAuthDispatch()
    const { user } = useAuthState()

    const { type } = props

    switch (type) {
        case SHOW__HOME_SUBMENU:
            return (
                <>
                    <div className='NavSubMenu'>
                        <h1 className='globalHeader' style={{ color: `${style.primaryHeader}` }}>
                            Home
                        </h1>
                        <ul>
                            <li>
                                <Link to={`/profile/${user._id}`} style={{ color: `${style.secondaryHeader}` }}>
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to='#' style={{ color: `${style.secondaryHeader}` }}>
                                    Friends Feed
                                </Link>
                            </li>
                            <li>
                                <Link to='#' style={{ color: `${style.secondaryHeader}` }}>
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link to='/' onClick={() => logout(authDispatch)} style={{ color: `${style.secondaryHeader}` }}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            )
        case SHOW_SHOP_SUBMENU:
            return (
                <>
                    <div className='NavSubMenu'>
                        <h1 className='globalHeader' style={{ color: `${style.primaryHeader}` }}>
                            Shop
                        </h1>
                        <ul>
                            <li>
                                <Link to='/' style={{ color: `${style.secondaryHeader}` }}>
                                    Featured
                                </Link>
                            </li>
                            <li>
                                <Link to='/' style={{ color: `${style.secondaryHeader}` }}>
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link to='#' style={{ color: `${style.secondaryHeader}` }}>
                                    Market
                                </Link>
                            </li>
                            <li>
                                <Link to='/' style={{ color: `${style.secondaryHeader}` }}>
                                    Stats
                                </Link>
                            </li>

                            <SubMenuCart />
                        </ul>
                    </div>
                </>
            )
        case SHOW_STREAM_SUBMENU:
            return (
                <>
                    <div className='NavSubMenu'>
                        <h1 className='globalHeader' style={{ color: `${style.primaryHeader}` }}>
                            Stream
                        </h1>
                    </div>
                </>
            )
        default:
            return null
    }
}
