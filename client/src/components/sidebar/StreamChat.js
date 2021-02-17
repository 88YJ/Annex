import React, { useEffect } from 'react'
import { Message } from '../messages/Message'
import { STREAM_MESSAGES } from '../messages/context/types'
import { useMessageDispatch, useMessageState, setMessage, updateStreamMessages, clearStreamMessages } from '../messages/context'
import { useSocketState } from '../socketManager'
import { useAuthState } from '../../pages/authentication/context'

import './StreamChat.css'

export const StreamChat = () => {
    const messageDispatch = useMessageDispatch()
    const { message } = useMessageState()
    const { socket } = useSocketState()
    const { user } = useAuthState()

    let chatId = 'firststream'

    useEffect(() => {
        if (socket) {
            leaveConnection()
            socket.emit('joinStreamChat', chatId)
            clearStreamMessages(messageDispatch)
        }
        async function leaveConnection() {
            socket.emit('leaveStreamChat', chatId)
            socket.removeAllListeners('recievedMessage')
        }
    }, [socket, chatId, messageDispatch])

    useEffect(() => {
        if (socket) {
            socket.on('recievedMessage', (messageContent) => {
                updateStreamMessages(messageDispatch, messageContent)
            })
        }
    }, [socket, messageDispatch])

    const sendMessage = (event) => {
        event.preventDefault()

        let messageContent = {
            userId: user._id,
            name: user.name,
            profilepicture: user.profilePicture,
            text: message,
        }

        setMessage(messageDispatch, '')

        socket.emit(chatId + 'sentMessage', messageContent)
    }

    return (
        <>
            <div style={{ backgroundColor: 'rgb(0,0,0,.9)' }}>
                <div style={{ height: '94%' }}>
                    <Message type={STREAM_MESSAGES} />
                </div>
                <input
                    placeholder='Talk Some Trash Talk..'
                    style={{ height: '5%', width: '315px', position: 'absolute', bottom: '1px', backgroundColor: 'black', color: 'white' }}
                    value={message}
                    onChange={({ target: { value } }) => setMessage(messageDispatch, value)}
                    onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
                />
            </div>
        </>
    )
}
