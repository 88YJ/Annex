import React from 'react'
import { useServerState } from './context'
import { useAuthState } from '../authentication/context'
import { style } from '../../css/CustomStyling'
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
                        <h3 style={{ height: 'auto', color: `${style.primaryHeader}` }}>
                            <img
                                src={EditIcon}
                                style={{ height: '20px', width: '20px', borderRadius: '0px', backgroundColor: `${style.primaryHeader}`, cursor: 'pointer' }}
                                alt=''
                                onClick={() => showModalWithChannelEdit(modalDispatch)}
                            />
                            <span className='chatHeader_hash' style={{ color: `${style.secondaryHeader}` }}>
                                #
                            </span>
                            {currentTextChannel.name}
                        </h3>
                    ) : (
                        <h3 style={{ height: 'auto', color: `${style.primaryHeader}` }}>
                            <span className='chatHeader_hash' style={{ color: `${style.secondaryHeader}` }}>
                                #
                            </span>
                            {currentTextChannel.name}
                        </h3>
                    )}
                </div>

                <div className='chatHeader_right'></div>
            </div>
        </>
    )
}
