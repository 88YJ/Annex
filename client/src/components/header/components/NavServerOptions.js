import React from 'react'
import Plus from '@material-ui/icons/AddCircleOutline'
import Edit from '@material-ui/icons/EditOutlined'
import Delete from '@material-ui/icons/DeleteOutline'

import { useModalDispatch, showModalWithAddServer, showModalWithEditServer, showModalWithAddChannel, showModalWithChannelEdit } from '../../modal/context'

import './NavServerOptions.css'

export const NavServerOptions = () => {
    const modalDispatch = useModalDispatch()

    return (
        <div className='Nav_Server_Options'>
            <div className='Nav_leftSidebar_Options' onClick={() => showModalWithAddServer(modalDispatch)}>
                <Plus />
                <p>Create Server</p>
            </div>
            <div className='Nav_leftSidebar_Options' onClick={() => showModalWithEditServer(modalDispatch)}>
                <Edit />
                <p>Edit Server</p>
            </div>
            <div className='Nav_leftSidebar_Options' onClick={() => showModalWithAddChannel(modalDispatch)}>
                <Plus />
                <p>Create Channel</p>
            </div>
            <div className='Nav_leftSidebar_Options' onClick={() => showModalWithChannelEdit(modalDispatch)}>
                <Edit />
                <p>Edit Channel</p>
            </div>
            <div className='Nav_leftSidebar_Options' onClick={() => {}}>
                <Delete />
                <p>Delete Server</p>
            </div>
        </div>
    )
}
