import {
    LOAD_CURRENT_SERVER,
    LOAD_CURRENT_VOICE_CHANNEL,
    LOAD_USER_JOINED_SERVERS,
    LOAD_SERVER_USERLIST,
    LOAD_SERVER_CHANNELLIST,
    LOAD_CURRENT_TEXT_CHANNEL,
    LOAD_ALL_SERVERS,
    CLEAR_SERVER_USERLIST,
    CLEAR_SERVER_CHANNELLIST,
} from './types'
import axios from 'axios'

const requestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export async function loadAllServers(dispatch) {
    try {
        const response = await axios.get('/api/servers', requestConfig)

        if (response.data) {
            dispatch({ type: LOAD_ALL_SERVERS, payload: response.data })
            console.log('Servers Loaded.')
        }
    } catch (error) {
        console.error(error)
    }
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

export async function loadCurrentServer(dispatch, server) {
    try {
        const response = await axios.get(`/api/servers/server/${server}`, requestConfig)
        dispatch({ type: LOAD_CURRENT_SERVER, payload: response.data })
        console.log('Server Loaded..')
    } catch (error) {
        console.log(error)
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
        if (channel && server) {
            const response = await axios.get(`/api/${server}/channels/messages/${channel._id}`, requestConfig)
            dispatch({ type: LOAD_CURRENT_TEXT_CHANNEL, payload: response.data })
            console.log('Channel loaded successfully.')
        } else {
            dispatch({ type: LOAD_CURRENT_TEXT_CHANNEL, payload: null })
            console.log('Landing loaded successfully.')
        }
    } catch (error) {
        console.error(error)
    }
}

export async function loadServerChannelList(dispatch, server, origin) {
    try {
        if (origin) {
            dispatch({ type: CLEAR_SERVER_CHANNELLIST })
        }

        let channelList = JSON.stringify(server.channelList)
        const response = await axios.get(`/api/${server}/channels/${channelList}`, requestConfig)
        dispatch({ type: LOAD_SERVER_CHANNELLIST, payload: response.data })
        console.log('Server channels loaded successfully.')
    } catch (error) {
        console.error(error)
    }
}

export async function loadServerUserList(dispatch, server, origin) {
    try {
        if (origin) {
            dispatch({ type: CLEAR_SERVER_USERLIST })
        }

        const response = await axios.get(`/api/servers/${server}/users`, requestConfig)
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
        await axios.put(`/api/${server}/channels/editchannel/${id}`, channel, requestConfig)
        console.log('Channel Edited')
    } catch (error) {
        console.error(error)
    }
}

export async function editServer(dispatch, server, id) {
    try {
        const response = await axios.put(`/api/servers/editserver/${id}`, server, requestConfig)
        console.log(response.data)
        console.log('Channel Edited')
    } catch (error) {
        console.error(error)
    }
}
