import React, { useState } from 'react'
import { useServerDispatch, useServerState, editServer } from '../../pages/server/context'

export const EditServerForm = () => {
    const serverDispatch = useServerDispatch()
    const { currentServer } = useServerState()

    const [server, setServer] = useState({
        name: '',
        img: '',
    })

    const { name, img } = server

    const onChange = (e) => setServer({ ...server, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        editServer(serverDispatch, server, currentServer._id)
        setServer({
            name: '',
            img: '',
        })
    }

    return (
        <form style={{ height: 'auto' }} onSubmit={onSubmit}>
            <h2 className='GeneralHeaders Primary-Header'>Edit Server</h2>
            <input className='GeneralHeaders' type='text' placeholder='Server Name' name='name' value={name} onChange={onChange} />
            <input className='GeneralHeaders' type='url' placeholder='Main Server Image' name='img' value={img} onChange={onChange} />

            <div style={{ height: 'auto' }}>
                <input className='GeneralHeaders globalbutton' type='submit' value='Save Changes' style={{ width: '99%' }} />
            </div>
        </form>
    )
}
