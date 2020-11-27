import React, { useState } from 'react'
import { style } from '../../css/CustomStyling'
import { useServerDispatch, useServerState, editChannel } from '../../pages/server/context'

export const EditChannelForm = () => {
    const serverDispatch = useServerDispatch()
    const { currentServer, currentTextChannel } = useServerState()

    const [channel, setChannel] = useState({
        name: '',
        img: '',
    })

    const { name, img } = channel

    const onChange = (e) => setChannel({ ...channel, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        editChannel(serverDispatch, channel, currentServer._id, currentTextChannel._id)
        setChannel({
            name: '',
            img: '',
        })
    }

    return (
        <form style={{ height: 'auto' }} onSubmit={onSubmit}>
            <h2 className='GeneralHeaders' style={{ color: `${style.primaryHeader}` }}>
                Edit Channel
            </h2>
            <input className='GeneralHeaders' type='text' placeholder='Channel Name' name='name' value={name} onChange={onChange} />
            <input className='GeneralHeaders' type='text' placeholder='Channel Image' name='img' value={img} onChange={onChange} />

            <div style={{ height: 'auto' }}>
                <input className='GeneralHeaders globalbutton' type='submit' value='Save Changes' />
            </div>
        </form>
    )
}
