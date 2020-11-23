import React from 'react'
import { useServerState } from './context'
import { style } from '../../css/CustomStyling'

export const ChannelHeader = () => {
    const { currentTextChannel } = useServerState()
    return (
        <>
            <div className='chatHeader'>
                <div className='chatHeader_left'>
                    <h3 style={{ height: 'auto', color: `${style.primaryHeader}` }}>
                        <span className='chatHeader_hash' style={{ color: `${style.secondaryHeader}` }}>
                            #
                        </span>
                        {currentTextChannel.name}
                    </h3>
                </div>

                <div className='chatHeader_right'></div>
            </div>
        </>
    )
}
