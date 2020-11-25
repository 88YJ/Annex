import {
    LOAD_CURRENT_SERVER,
    LOAD_CURRENT_VOICE_CHANNEL,
    LOAD_USER_JOINED_SERVERS,
    LOAD_SERVER_USERLIST,
    LOAD_SERVER_CHANNELLIST,
    LOAD_CURRENT_TEXT_CHANNEL,
} from './types'
import axios from 'axios'

const requestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export async function loadJoinedServers(dispatch) {
    try {
        const response = await axios.get('/api/servers/joinedservers', requestConfig)
        if (response.data) {
            dispatch({ type: LOAD_USER_JOINED_SERVERS, payload: response.data })
            console.log('Joined servers loaded successfully.')
        }
    } catch (error) {
        console.error(error)
    }
}

export function loadCurrentServer(dispatch, server) {
    try {
        dispatch({ type: LOAD_CURRENT_SERVER, payload: server })
        console.log('Server loaded successfully.')
    } catch (error) {
        console.error(error)
    }
}

export async function loadCurrentVoiceChannel(dispatch, channel) {
    try {
        dispatch({ type: LOAD_CURRENT_VOICE_CHANNEL, payload: channel })
        console.log('Channel loaded successfully.')
    } catch (error) {
        console.error(error)
    }
}

export async function loadCurrentTextChannel(dispatch, channel, server) {
    try {
        if (channel) {
            const response = await axios.get(`/api/${server}/channels/messages/${channel._id}`, requestConfig)
            dispatch({ type: LOAD_CURRENT_TEXT_CHANNEL, payload: response.data })
            console.log('Channel loaded successfully.')
        } else {
            dispatch({ type: LOAD_CURRENT_TEXT_CHANNEL, payload: channel })
            console.log('Channel loaded successfully.')
        }
    } catch (error) {
        console.error(error)
    }
}

export async function loadServerChannelList(dispatch, server) {
    try {
        let channelList = JSON.stringify(server.channelList)

        const response = await axios.get(`/api/${server._id}/channels/${channelList}`, requestConfig)
        dispatch({ type: LOAD_SERVER_CHANNELLIST, payload: response.data })
        console.log('Server channels loaded successfully.')
    } catch (error) {
        console.error(error)
    }
}

export async function loadServerUserList(dispatch, server) {
    try {
        const response = await axios.get(`/api/servers/${server._id}/users`, requestConfig)
        dispatch({ type: LOAD_SERVER_USERLIST, payload: response.data })
        console.log('Server users loaded successfully.')
    } catch (error) {
        console.error(error)
    }
}

export async function createServer(dispatch, server) {
    try {
        const response = await axios.post('/api/servers', server, requestConfig)
        await axios.put(`api/users/joinserver/${response.data._id}`, server, requestConfig)
        const request = await axios.get('/api/servers/joinedservers', requestConfig)
        if (request.data) {
            dispatch({ type: LOAD_USER_JOINED_SERVERS, payload: request.data })
            console.log('Joined servers loaded successfully.')
        }

        console.log('Server Created')
    } catch (error) {
        console.error(error)
    }
}

export async function createChannel(dispatch, channel, server) {
    try {
        const response = await axios.post(`/api/${server}/channels/${server}`, channel, requestConfig)
        console.log(response.data)
        console.log('Channel Created')
    } catch (error) {
        console.error(error)
    }
}

export async function editChannel(dispatch, channel, server, id) {
    try {
        const response = await axios.put(`/api/${server}/channels/editchannel/${id}`, channel, requestConfig)
        console.log(response.data)
        console.log('Channel Edited')
    } catch (error) {
        console.error(error)
    }
}
