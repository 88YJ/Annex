import React, { useEffect } from 'react'
import { useProfileState } from '../profile/context'
import { useMessageDispatch, useMessageState, setMessage, updateDirectMessages, clearDirectMessages } from '../../components/messages/context'
import { useSocketState } from '../../components/socketManager'
import { useAuthState } from '../../pages/authentication/context'
import { Message } from '../../components/messages/Message'
import { DIRECT_MESSAGES } from '../../components/messages/context/types'

export const Messenger = () => {
    const messageDispatch = useMessageDispatch()
    const { CurrentProfile } = useProfileState()
    const { message } = useMessageState()
    const { socket } = useSocketState()
    const { user } = useAuthState()

    useEffect(() => {
        if (socket && CurrentProfile) {
            socket.removeAllListeners('text-chat:incoming-message')
            clearDirectMessages(messageDispatch)
            socket.on('text-chat:incoming-message', (messageContent) => {
                if (messageContent.userId === CurrentProfile._id || messageContent.userId === user._id) {
                    updateDirectMessages(messageDispatch, messageContent)
                }
            })
        }
    }, [socket, CurrentProfile, messageDispatch, user._id])

    const sendMessage = (event) => {
        event.preventDefault()
        let messageContent = {
            userId: user._id,
            name: user.name,
            profilepicture: user.profilePicture,
            text: message,
            date: Date(),
        }

        setMessage(messageDispatch, '')

        socket.emit('text-chat:send-direct', messageContent, CurrentProfile._id)
    }

    if (CurrentProfile) {
        return (
            <div className='channelPage' style={{ backgroundImage: `url(${CurrentProfile.backgroundPicture})` }}>
                <div className='chat'>
                    {/* <ChannelHeader /> */}

                    <div className='chat_messages'>
                        <Message type={DIRECT_MESSAGES} />
                    </div>
                    <div className='chat_input'>
                        <form>
                            <input
                                placeholder='Talk Some Trash Talk..'
                                value={message}
                                onChange={({ target: { value } }) => setMessage(messageDispatch, value)}
                                onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    } else return null
}
