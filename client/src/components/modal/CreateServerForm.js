import React, { useState } from 'react'
import { useServerDispatch, createServer } from '../../pages/server/context'

export const CreateServerForm = () => {
    const serverDispatch = useServerDispatch()

    const [server, setServer] = useState({
        name: '',
        img: '',
    })

    const { name, img } = server

    const onChange = (e) => setServer({ ...server, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        createServer(serverDispatch, server)
        setServer({
            name: '',
            img: '',
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='GeneralHeaders Primary-Header'>Create a Server</h2>
            <input className='GeneralHeaders' type='text' placeholder='Sever Name' name='name' value={name} onChange={onChange} />
            <input className='GeneralHeaders' type='url' placeholder='Image URL' name='img' value={img} onChange={onChange} />
            <div>
                <input className='GeneralHeaders globalbutton' type='submit' value='Create Server' style={{ width: '99%' }} />
            </div>
        </form>
    )
}
