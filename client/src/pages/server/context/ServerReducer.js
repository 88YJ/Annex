import {
    LOAD_CURRENT_SERVER,
    LOAD_USER_JOINED_SERVERS,
    LOAD_SERVER_USERLIST,
    LOAD_SERVER_CHANNELLIST,
    LOAD_CURRENT_VOICE_CHANNEL,
    LOAD_CURRENT_TEXT_CHANNEL,
    LOAD_ALL_SERVERS,
} from './types'

export const initialState = {
    joinedServersList: [],
    allServers: [],
    allServersLoaded: false,
    currentServer: undefined,
    currentServerID: undefined,
    channelList: [],
    currentVoiceChannel: undefined,
    currentTextChannel: undefined,
    userList: [],
    loading: true,
}

export const ServerReducer = (initialState, action) => {
    switch (action.type) {
        case LOAD_USER_JOINED_SERVERS:
            return {
                ...initialState,
                joinedServersList: action.payload,
                loading: false,
            }
        case LOAD_CURRENT_SERVER:
            return {
                ...initialState,
                currentServer: action.payload,
                currentServerID: action.payload._id,
                loading: false,
            }
        case LOAD_SERVER_USERLIST:
            return {
                ...initialState,
                userList: action.payload,
                loading: false,
            }
        case LOAD_SERVER_CHANNELLIST:
            return {
                ...initialState,
                channelList: action.payload,
                loading: false,
            }
        case LOAD_CURRENT_VOICE_CHANNEL:
            return {
                ...initialState,
                currentVoiceChannel: action.payload,
            }
        case LOAD_CURRENT_TEXT_CHANNEL:
            return {
                ...initialState,
                currentTextChannel: action.payload,
            }
        case LOAD_ALL_SERVERS:
            return {
                ...initialState,
                allServers: action.payload,
                allServersLoaded: true,
            }

        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
