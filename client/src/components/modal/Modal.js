import React from 'react'
import { useModalDispatch, useModalState, hideModal } from './context'
import { ScreenshotForm } from './ScreenshotForm'
import { CreateServerForm } from './CreateServerForm'
import { CreateChannelForm } from './CreateChannelForm'
import { EditChannelForm } from './EditChannelForm'

import { style } from '../../css/CustomStyling'

export const Modal = () => {
    const { show, addServer, addChannel, editProfile, screenShot, channelEdit } = useModalState()
    const modalDispatch = useModalDispatch()

    const onHideModal = () => {
        hideModal(modalDispatch)
    }

    const customContent = (content) => (
        <div className='modal'>
            <div style={{ height: 'auto' }} className='modal-content'>
                <span className='close' style={{ color: `${style.primaryHeader}` }} onClick={onHideModal}>
                    &times;
                </span>
                {content}
            </div>
        </div>
    )

    return (
        <>
            {show && screenShot ? customContent(<ScreenshotForm />) : null}
            {show && channelEdit ? customContent(<EditChannelForm />) : null}
            {show && addServer ? customContent(<CreateServerForm />) : null}
            {show && addChannel ? customContent(<CreateChannelForm />) : null}
        </>
    )
}
