import React from 'react'
import { useModalState } from './context'

export const ScreenshotForm = () => {
    const { screenShotLink } = useModalState()

    return <>{screenShotLink ? <img style={{ height: 'auto', width: '100%' }} src={screenShotLink} alt='' /> : null}</>
}
