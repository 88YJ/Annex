import React from 'react'
import { useServerState } from './context'
import { useAuthState } from '../authentication/context'

export const ChannelHeader = () => {
    const { currentServer } = useServerState()

    const { user } = useAuthState()

    return (
        <>
            <div className='chatHeader'>
                <div className='chatHeader_left'>
                    {currentServer.owner === user._id ? (
                        <h3 className='Primary-Header' style={{ height: 'auto' }}>
                            {currentServer.name}
                        </h3>
                    ) : (
                        <h3 className='Primary-Header' style={{ height: 'auto' }}>
                            {currentServer.name}
                        </h3>
                    )}
                </div>

                <div className='chatHeader_right'></div>
            </div>
        </>
    )
}
