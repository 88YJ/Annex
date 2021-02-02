import React, { useEffect } from 'react'
import StreamSetup from './StreamSetup'

import { useSideBarDispatch, showFriends, showStreamChat } from '../../components/sidebar/context'

export const Stream = () => {
    const sidebarDispatch = useSideBarDispatch()

    useEffect(() => {
        document.getElementsByTagName('div')[3].setAttribute('class', 'app-mainGridStream')
    }, [])

    useEffect(() => {
        showFriends(sidebarDispatch)
        showStreamChat(sidebarDispatch)
    }, [sidebarDispatch])

    return (
        <div>
            <StreamSetup />
            <div
                style={{
                    backgroundImage: `url('https://i.pinimg.com/originals/94/9a/89/949a8992f9829eedcb60b7f7c0b2faf6.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '150px',
                    width: 'auto',
                }}
            >
                <h1 className='globalHeaderL stream_name'>Rejis is live!</h1>
                <h4 className='globalHeaderL stream_game'></h4>
            </div>
        </div>
    )
}
