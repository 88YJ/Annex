import React from 'react'
import { useServerState } from './context'
import { useAuthState } from '../authentication/context'
import EditIcon from '../../images/EditIcon.png'
import { useModalDispatch, showModalWithChannelEdit } from '../../components/modal/context'

export const ChannelHeader = () => {
    const { currentTextChannel, currentServer } = useServerState()
    const modalDispatch = useModalDispatch()
    const { user } = useAuthState()

    return (
        <>
            <div className='chatHeader'>
                <div className='chatHeader_left'>
                    {currentServer.owner === user._id ? (
                        <h3 className='Primary-Header' style={{ height: 'auto' }}>
                            <img
                                className='Bright-Background'
                                src={EditIcon}
                                style={{ height: '20px', width: '20px', borderRadius: '0px', cursor: 'pointer' }}
                                alt=''
                                onClick={() => showModalWithChannelEdit(modalDispatch)}
                            />
                            <span className='chatHeader_hash Secondary-Header'>#</span>
                            {currentTextChannel.name}
                        </h3>
                    ) : (
                        <h3 className='Primary-Header' style={{ height: 'auto' }}>
                            <span className='chatHeader_hash Secondary-Header'>#</span>
                            {currentTextChannel.name}
                        </h3>
                    )}
                </div>

                <div className='chatHeader_right'></div>
            </div>
        </>
    )
}
