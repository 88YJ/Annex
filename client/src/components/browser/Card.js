import React from 'react'
import { useDashState } from '../../pages/dashboard/context'
import { SHOW_SCREENSHOTS, SHOW_GAMES, SHOW_STREAMS } from './types/types'
import { useProfileState } from '../../pages/profile/context'
import { useModalDispatch, showModalwithScreenshot } from '../modal/context'

export const Card = (props) => {
    const { type } = props
    const { trendgames, trendstream } = useDashState()
    const { CurrentProfile } = useProfileState()
    const modalDispatch = useModalDispatch()

    switch (type) {
        case SHOW_SCREENSHOTS:
            return (
                <>
                    {CurrentProfile.screenShots.map((item, index) => (
                        <div className='card' key={index} onClick={() => showModalwithScreenshot(modalDispatch, item)}>
                            <img src={item} alt='' />
                        </div>
                    ))}
                </>
            )
        case SHOW_STREAMS:
            return (
                <>
                    {trendstream.map((item, index) => (
                        <div className='card' key={index}>
                            <img src={item.img} alt='' />
                            <h2 className='globalheader Border-Top-1PX Secondary-Header'>{item.name}</h2>
                        </div>
                    ))}
                </>
            )
        case SHOW_GAMES:
            return (
                <>
                    {trendgames.map((item, index) => (
                        <div className='card' key={index}>
                            <img src={item.img} alt='' />
                            <h2 className='globalheader Border-Top-1PX Secondary-Header'>{item.name}</h2>
                        </div>
                    ))}
                </>
            )
        default:
            return null
    }
}
