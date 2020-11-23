import React from 'react'
import { useDashState } from '../../pages/dashboard/context'
import { SHOW_SCREENSHOTS, SHOW_GAMES, SHOW_STREAMS } from './types/types'
import { useProfileState } from '../../pages/profile/context'
import { style } from '../../css/CustomStyling'
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
                            <img src={item} alt=''></img>
                        </div>
                    ))}
                </>
            )
        case SHOW_STREAMS:
            return (
                <>
                    {trendstream.map((item, index) => (
                        <div className='card' key={index}>
                            <img src={item.img} alt='' style={{ border: `${style.outLine} 2px solid` }}></img>
                            <h2
                                className='globalheader'
                                style={{
                                    color: `${style.secondaryHeader}`,
                                    borderTop: `${style.activeOutline} 1px solid`,
                                    backgroundColor: `${style.primaryBackground}`,
                                }}
                            >
                                {item.name}
                            </h2>
                        </div>
                    ))}
                </>
            )
        case SHOW_GAMES:
            return (
                <>
                    {trendgames.map((item, index) => (
                        <div className='card' key={index}>
                            <img src={item.img} alt='' style={{ border: `${style.outLine} 2px solid` }}></img>
                            <h2
                                className='globalheader'
                                style={{
                                    color: `${style.secondaryHeader}`,
                                    borderTop: `${style.activeOutline} 1px solid`,
                                    backgroundColor: `${style.primaryBackground}`,
                                }}
                            >
                                {item.name}
                            </h2>
                        </div>
                    ))}
                </>
            )
        default:
            return null
    }
}
