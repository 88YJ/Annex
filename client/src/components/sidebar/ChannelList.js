import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useServerState, useServerDispatch, loadServerChannelList, loadCurrentChannel } from "../../pages/server/context"

export const ChannelList = () => {
    const { currentServer, channelList } = useServerState();
    const serverDispatch = useServerDispatch();

    useEffect(() => {
        if (currentServer) {
            loadServerChannelList(serverDispatch, currentServer);
        }
    }, [currentServer, serverDispatch])

    const handleChannelJoin = (channel) => {
        try {
            loadCurrentChannel(serverDispatch, channel);
        } catch (error) {
            console.error(error)
        }
    }

    if (currentServer) {
        return (
            <div className='L-Sidebar-Serverchannels'>
                <h3 className='globalHeader' style={{ background: 'black', color: 'red' }}>
                    {currentServer.name}
                </h3>
                <ul>
                    <li>
                        <Link to={`/server/${currentServer._id}`}>Landing Page</Link>
                    </li>
                    {channelList.map((channel) => (
                        <li key={channel.name}>
                            <Link onClick={() => handleChannelJoin(channel)} to={`/server/${currentServer._id}/${channel._id}`}>
                                {channel.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return <div>Loading...</div>
}