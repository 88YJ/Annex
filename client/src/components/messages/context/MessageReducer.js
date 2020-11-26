import {
    UPDATE_STREAM_MESSAGES,
    CLEAR_STREAM_MESSAGES,
    SET_MESSAGE,
    UPDATE_CHANNEL_MESSAGES,
    LOAD_CHANNEL_MESSAGES,
    CLEAR_CHANNEL_MESSAGES,
    UPDATE_DIRECT_MESSAGES,
    CLEAR_DIRECT_MESSAGES,
    LOAD_DIRECT_MESSAGES,
    LOAD_INBOX,
} from './types'

export const initialState = {
    StreamMessages: [],
    ChannelMessages: [],
    DirectMessages: [],
    message: '',
    inbox: [],
}

export const MessageReducer = (initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...initialState,
                message: action.payload,
            }
        case UPDATE_STREAM_MESSAGES:
            return {
                ...initialState,
                StreamMessages: [...initialState.StreamMessages, action.payload],
            }
        case CLEAR_STREAM_MESSAGES:
            return {
                ...initialState,
                StreamMessages: [],
            }
        case UPDATE_CHANNEL_MESSAGES:
            return {
                ...initialState,
                ChannelMessages: [...initialState.ChannelMessages, action.payload],
            }
        case LOAD_CHANNEL_MESSAGES:
            return {
                ...initialState,
                ChannelMessages: action.payload,
            }
        case CLEAR_CHANNEL_MESSAGES:
            return {
                ...initialState,
                ChannelMessages: [],
            }
        case UPDATE_DIRECT_MESSAGES:
            return {
                ...initialState,
                DirectMessages: [...initialState.DirectMessages, action.payload],
            }
        case LOAD_DIRECT_MESSAGES:
            return {
                ...initialState,
                DirectMessages: action.payload,
            }
        case LOAD_INBOX:
            return {
                ...initialState,
                inbox: action.payload,
            }
        case CLEAR_DIRECT_MESSAGES:
            return {
                ...initialState,
                DirectMessages: [],
            }

        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
