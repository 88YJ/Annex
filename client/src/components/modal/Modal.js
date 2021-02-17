import React from 'react'
import './Modal.css'
import { useModalDispatch, useModalState, hideModal } from './context'
import { ScreenshotForm } from './ScreenshotForm'
import { CreateServerForm } from './CreateServerForm'
import { CreateChannelForm } from './CreateChannelForm'
import { EditChannelForm } from './EditChannelForm'
import { EditProfileForm } from './EditProfileForm'
import { FriendRequestsForm } from './FriendRequestsForm'
import { EditColorSchemeForm } from './EditColorSchemeForm'
import { EditServerForm } from './EditServerForm'

export const Modal = () => {
    const { show, addServer, addChannel, editProfile, screenShot, channelEdit, friendRequests, colorScheme, editServer } = useModalState()
    const modalDispatch = useModalDispatch()

    const onHideModal = () => {
        hideModal(modalDispatch)
    }

    const customContent = (content) => (
        <div className='modal'>
            <div style={{ height: 'auto' }} className='modal-content'>
                <span className='close' onClick={onHideModal}>
                    &times;
                </span>
                {content}
            </div>
        </div>
    )

    return (
        <>
            {show && screenShot ? customContent(<ScreenshotForm />) : null}
            {show && editProfile ? customContent(<EditProfileForm />) : null}
            {show && editServer ? customContent(<EditServerForm />) : null}
            {show && colorScheme ? customContent(<EditColorSchemeForm />) : null}
            {show && friendRequests ? customContent(<FriendRequestsForm />) : null}
            {show && channelEdit ? customContent(<EditChannelForm />) : null}
            {show && addServer ? customContent(<CreateServerForm />) : null}
            {show && addChannel ? customContent(<CreateChannelForm />) : null}
        </>
    )
}
