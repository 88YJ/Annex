import React from 'react'
import { Link } from 'react-router-dom'
import { useMessageState } from './context'
import ScrollToBottom from 'react-scroll-to-bottom'
import ReactEmoji from 'react-emoji'
import { useSideBarDispatch, showGames } from '../../components/sidebar/context'
import { STREAM_MESSAGES, CHANNEL_MESSAGES, DIRECT_MESSAGES } from './context/types'

export const Message = (props) => {
    const { type } = props

    const { StreamMessages, ChannelMessages, DirectMessages } = useMessageState()
    const sidebarDispatch = useSideBarDispatch()

    function changesidebar() {
        document.getElementsByTagName('div')[3].setAttribute('class', 'app-mainGrid')
        showGames(sidebarDispatch)
    }
    switch (type) {
        case STREAM_MESSAGES:
            if (StreamMessages) {
                return (
                    <>
                        <ScrollToBottom className='messages'>
                            {StreamMessages.map((message, i) => (
                                <div className='messageContainer' key={i}>
                                    <div className='profileInfoContainer'>
                                        <Link onClick={() => changesidebar()} to={`/profile/${message.userId}`} style={{ height: '25px', width: '25px' }}>
                                            <div
                                                className='profilepicture'
                                                style={{ backgroundImage: `url(${message.profilepicture})`, height: '25px', width: '25px' }}
                                            />
                                        </Link>
                                        <h4 className='streamChatUsername' style={{ color: 'red' }}>
                                            {message.name}
                                        </h4>
                                    </div>
                                    <div className='messageBox'>
                                        <p className='messageText'>{ReactEmoji.emojify(message.text)}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollToBottom>
                    </>
                )
            } else return null
        case CHANNEL_MESSAGES:
            if (ChannelMessages) {
                return (
                    <>
                        <ScrollToBottom>
                            {ChannelMessages.map((message, i) => (
                                <div className='message' key={i}>
                                    <Link to={`/profile/${message.userId}`} style={{ height: '45px', width: '55px' }}>
                                        <div
                                            className='NavIcons'
                                            style={{ backgroundImage: `url(${message.profilepicture})`, height: '45px', width: '45px' }}
                                        />
                                    </Link>
                                    <div className='message_info'>
                                        <h4>
                                            {message.name}
                                            <span className='message_timestamp'>{message.date}</span>
                                        </h4>
                                        <p>{ReactEmoji.emojify(message.text)}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollToBottom>
                    </>
                )
            } else return null
        case DIRECT_MESSAGES:
            if (DirectMessages) {
                return (
                    <>
                        <ScrollToBottom>
                            {DirectMessages.map((message, i) => (
                                <div className='message' key={i}>
                                    <Link to={`/profile/${message.userId}`} style={{ height: '45px', width: '55px' }}>
                                        <div
                                            className='NavIcons'
                                            style={{ backgroundImage: `url(${message.profilepicture})`, height: '45px', width: '45px' }}
                                        />
                                    </Link>
                                    <div className='message_info'>
                                        <h4>
                                            {message.name}
                                            <span className='message_timestamp'>{message.date}</span>
                                        </h4>
                                        <p>{ReactEmoji.emojify(message.text)}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollToBottom>
                    </>
                )
            } else return null
        default:
            return null
    }
}
