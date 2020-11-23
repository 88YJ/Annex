import React, { useEffect } from 'react'
import { CHANNEL_MESSAGES } from '../../components/messages/context/types'
import { Message } from '../../components/messages/Message'
import { ChannelHeader } from './ChannelHeader'
import { useMessageDispatch, useMessageState, setMessage, updateChannelMessages, clearChannelMessages } from '../../components/messages/context'
import { useSocketState } from '../../components/socketManager'
import { useAuthState } from '../../pages/authentication/context'
import { useServerState } from './context'
import { style } from '../../css/CustomStyling'

export const Channel = () => {
    const messageDispatch = useMessageDispatch()
    const { message } = useMessageState()
    const { currentServer, currentTextChannel } = useServerState()
    const { socket } = useSocketState()
    const { user } = useAuthState()

    useEffect(() => {
        if (socket && currentTextChannel) {
            leaveConnection()
            socket.emit('joinChat', currentTextChannel._id)
            clearChannelMessages(messageDispatch)
        }

        async function leaveConnection() {
            socket.emit('leaveChat', currentTextChannel._id)
            socket.removeAllListeners('recievedMessage')
        }
    }, [socket, currentTextChannel, messageDispatch])

    useEffect(() => {
        if (socket && currentTextChannel) {
            socket.on('recievedMessage', (messageContent) => {
                updateChannelMessages(messageDispatch, messageContent)
            })
        }
    }, [socket, currentTextChannel, messageDispatch])

    useEffect(() => {
        if (currentTextChannel) {
            //updateChannelMessages(currentTextChannel.messages)
            console.log(currentTextChannel.messages)
            currentTextChannel.messages.forEach((element) => updateChannelMessages(messageDispatch, element))
        }
    }, [currentTextChannel, messageDispatch])

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

        socket.emit(currentTextChannel._id + 'sentMessage', messageContent)
    }

    if (currentServer) {
        if (!currentTextChannel) {
            return (
                <div className='server-Landingpageimg' style={{ backgroundImage: `url(${currentServer.img})` }}>
                    <div>
                        <h1 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: `${style.primaryHeader}` }}>
                            {currentServer.name}
                        </h1>
                    </div>
                    <div>
                        <div>
                            <div>
                                <h2 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: `${style.secondaryHeader}` }}>
                                    Welcome To the Server!!
                                </h2>
                                <br />
                                <h2 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: `${style.secondaryHeader}` }}>
                                    Please take a look at our rules!
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className='globalHeader'></div>
                </div>
            )
        } else
            return (
                <div className='channelPage' style={{ backgroundImage: `url(${currentTextChannel.customization.icon})` }}>
                    <div className='chat'>
                        <ChannelHeader />

                        <div className='chat_messages'>
                            <Message type={CHANNEL_MESSAGES} />
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
