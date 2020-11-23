import React from 'react'
import { useModalState } from './context'

export const ScreenshotForm = () => {
    const { screenShotLink } = useModalState()

    return <>{screenShotLink ? <img style={{ height: '500px', width: 'auto' }} src={screenShotLink} alt='' /> : null}</>
}
