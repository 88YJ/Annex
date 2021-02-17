import React, { useEffect } from 'react'
import { Channel } from './Channel'
import { ChannelList } from '../../components/sidebar/ChannelList'
import { ServerUserList } from '../../components/sidebar/ServerUserList'
import { useParams } from 'react-router'
import { useServerState, useServerDispatch, loadCurrentServer, loadCurrentTextChannel } from './context'
import { useSideBarDispatch, showChannellist, showUserlist } from '../../components/sidebar/context'
import DefaultBackground from '../../images/DefaultBackgroundV2.png'

import './Server.css'

export const ServerLanding = () => {
    const { server_id, channel_id } = useParams()
    const { loading, channelList, currentServer, currentTextChannel } = useServerState()

    const serverDispatch = useServerDispatch()

    const sidebarDispatch = useSideBarDispatch()

    let background = currentTextChannel && currentTextChannel.customization !== undefined ? currentTextChannel.customization.icon : DefaultBackground

    useEffect(() => {
        loadCurrentServer(serverDispatch, server_id)
    }, [serverDispatch, server_id])

    useEffect(() => {
        if (!loading) {
            let channel = channelList.filter((channel) => channel._id === channel_id)
            if (channel[0]) {
                loadCurrentTextChannel(serverDispatch, channel[0], server_id)
            } else {
                loadCurrentTextChannel(serverDispatch)
            }
        }
    }, [loading, serverDispatch, channelList, channel_id, server_id])

    useEffect(() => {
        showChannellist(sidebarDispatch)
        showUserlist(sidebarDispatch)
    }, [sidebarDispatch])

    if (currentServer) {
        return (
            <div
                className='Server_Container'
                style={{
                    backgroundImage: `-webkit-linear-gradient(left, 
                        rgba(0,0,0,0.9) 0%, 
                        rgba(0,0,0,0) 25%,
                        rgba(0,0,0,0) 80%,
                        rgba(0,0,0,0.9) 100%
                      ), url(${currentTextChannel ? background : currentServer.img})`,
                }}
            >
                <div style={{ width: '70%' }}>
                    <ChannelList />
                </div>
                <div className='Server_Channel'>
                    <Channel />
                </div>
                <div style={{ width: '70%' }}>
                    <ServerUserList />
                </div>
            </div>
        )
    } else return null
}
