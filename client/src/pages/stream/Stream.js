import React, { useEffect } from 'react'
import StreamSetup from './StreamSetup'
import Star from '@material-ui/icons/StarOutline'
import Follow from '@material-ui/icons/GroupOutlined'

import './Stream.css'

import { useSideBarDispatch, showFriends, showStreamChat } from '../../components/sidebar/context'

export const Stream = () => {
    const sidebarDispatch = useSideBarDispatch()

    useEffect(() => {
        showFriends(sidebarDispatch)
        showStreamChat(sidebarDispatch)
    }, [sidebarDispatch])

    return (
        <div className='stream_Container'>
            <StreamSetup />
            <div
                className='stream_Banner'
                style={{
                    backgroundImage: `url('https://wallpaperaccess.com/full/448629.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className='stream_ProfilePicture'
                    style={{
                        backgroundImage: `url('https://zetgaming.com/wp-content/uploads/2020/01/little-busters-switch-950x534.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div>
                    <h1 className='globalHeaderL stream_name'>Rejis</h1>
                    <h4 className='globalHeaderL stream_game'>Trying out some Dust!</h4>
                    <h4 className='globalHeaderL stream_game'>Dust</h4>
                </div>
                <div className='stream_RightContainer_Div'>
                    <div className='stream_Buttons_Container'>
                        <button className='streamButton'>
                            <Follow />
                            <p>Follow</p>
                        </button>
                        <button className='streamButton'>
                            <Star />
                            <p>Subscribe</p>
                        </button>
                    </div>

                    <h2 className='Primary-Header'>Viewers: 1</h2>
                </div>
            </div>
        </div>
    )
}
