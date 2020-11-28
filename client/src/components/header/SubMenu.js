import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState, useAuthDispatch, logout } from '../../pages/authentication/context'
import { useMessageDispatch, useMessageState, loadInbox } from '../messages/context'
import EditIcon from '../../images/EditIcon.png'
import { useModalDispatch, showModalWithColorScheme } from '../modal/context'
import { SHOW_SHOP_SUBMENU, SHOW__HOME_SUBMENU, SHOW_STREAM_SUBMENU } from './types/types'
import { SubMenuCart } from './SubMenuCart'

export const SubMenu = (props) => {
    const modalDispatch = useModalDispatch()
    const authDispatch = useAuthDispatch()
    const { user } = useAuthState()
    const messageDispatch = useMessageDispatch()
    const { inbox } = useMessageState()
    useEffect(() => {
        loadInbox(messageDispatch, user._id)
    }, [user, messageDispatch])

    const { type } = props

    switch (type) {
        case SHOW__HOME_SUBMENU:
            return (
                <>
                    <div className='NavSubMenu'>
                        <h1 className='globalHeader Primary-Header'>
                            <img
                                className='Bright-Background'
                                src={EditIcon}
                                style={{
                                    height: '20px',
                                    width: '20px',
                                    borderRadius: '0px',
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    left: '10px',
                                    top: '10px',
                                }}
                                onClick={() => showModalWithColorScheme(modalDispatch)}
                            />
                            Home
                        </h1>
                        <ul>
                            <li>
                                <Link to={`/profile/${user._id}`}>My Profile</Link>
                            </li>
                            <li>
                                <Link to='#'>Friends Feed</Link>
                            </li>
                            <li>
                                <Link to='#'>Community</Link>
                            </li>
                            <li>
                                <Link to='/' onClick={() => logout(authDispatch)}>
                                    Logout
                                </Link>
                            </li>
                            {inbox && inbox.length !== 0
                                ? inbox.messages.map((item, i) =>
                                      item.read ? (
                                          <li key={i} className='FriendMessages Primary-Background'>
                                              <Link to={`/profile/${item.user._id}`} style={{ width: '60px' }}>
                                                  <div className='NavIcons' style={{ backgroundImage: `url(${item.user.profilePicture})` }} />
                                              </Link>

                                              <Link to={`/directchat/${item.user._id}`}>{item.user.name}</Link>
                                          </li>
                                      ) : (
                                          <li key={i} className='FriendMessages Secondary-Background'>
                                              <Link to={`/profile/${item.user._id}`} style={{ width: '60px' }}>
                                                  <div className='NavIcons' style={{ backgroundImage: `url(${item.user.profilePicture})` }} />
                                              </Link>

                                              <Link to={`/directchat/${item.user._id}`}>{item.user.name}</Link>
                                          </li>
                                      )
                                  )
                                : null}
                        </ul>
                    </div>
                </>
            )
        case SHOW_SHOP_SUBMENU:
            return (
                <>
                    <div className='NavSubMenu'>
                        <h1 className='globalHeader Primary-Header'>Shop</h1>
                        <ul>
                            <li>
                                <Link to='/' className='Secondary-Header'>
                                    Featured
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className='Secondary-Header'>
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link to='#' className='Secondary-Header'>
                                    Market
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className='Secondary-Header'>
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
                        <h1 className='globalHeader Primary-Header'>Stream</h1>
                    </div>
                </>
            )
        default:
            return null
    }
}
