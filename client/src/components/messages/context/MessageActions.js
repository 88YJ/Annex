import {
    UPDATE_STREAM_MESSAGES,
    CLEAR_STREAM_MESSAGES,
    SET_MESSAGE,
    UPDATE_CHANNEL_MESSAGES,
    CLEAR_CHANNEL_MESSAGES,
    UPDATE_DIRECT_MESSAGES,
    CLEAR_DIRECT_MESSAGES,
    LOAD_DIRECT_MESSAGES,
    LOAD_CHANNEL_MESSAGES,
    LOAD_INBOX,
} from './types'

import axios from 'axios'

const requestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export function updateStreamMessages(dispatch, message) {
    try {
        dispatch({ type: UPDATE_STREAM_MESSAGES, payload: message })
        console.log('Message Recieved..')
    } catch (error) {
        console.error(error)
    }
}

export function clearStreamMessages(dispatch) {
    try {
        dispatch({ type: CLEAR_STREAM_MESSAGES })
        console.log('Stream Messages Cleared')
    } catch (error) {
        console.error(error)
    }
}

export function updateChannelMessages(dispatch, message) {
    try {
        dispatch({ type: UPDATE_CHANNEL_MESSAGES, payload: message })
        console.log('Message Recieved..')
    } catch (error) {
        console.error(error)
    }
}

export function loadChannelMessages(dispatch, messages) {
    try {
        dispatch({ type: LOAD_CHANNEL_MESSAGES, payload: messages })
        console.log(' Messages Loaded')
    } catch (error) {
        console.error(error)
    }
}

export function clearChannelMessages(dispatch) {
    try {
        dispatch({ type: CLEAR_CHANNEL_MESSAGES })
        console.log('Channel Messages Cleared')
    } catch (error) {
        console.error(error)
    }
}

export function setMessage(dispatch, message) {
    try {
        dispatch({ type: SET_MESSAGE, payload: message })
    } catch (error) {
        console.error(error)
    }
}

export function updateDirectMessages(dispatch, message) {
    try {
        dispatch({ type: UPDATE_DIRECT_MESSAGES, payload: message })
        console.log('Message Recieved..')
    } catch (error) {
        console.error(error)
    }
}

export async function loadDirectMessages(dispatch, profile) {
    try {
        const response = await axios.get(`/api/directmessage/${profile}`, requestConfig)

        if (response.data === 'error') {
            console.log('an err occured in load direct messages, likely it was creating a message container, can disregard')
        } else {
            dispatch({ type: LOAD_DIRECT_MESSAGES, payload: response.data })
        }

        console.log('Direct Messages Loaded')
    } catch (error) {
        console.error(error)
    }
}

export async function loadInbox(dispatch, profile) {
    try {
        const response = await axios.get(`/api/directmessage/inbox/${profile}`, requestConfig)
        dispatch({ type: LOAD_INBOX, payload: response.data })

        console.log('inbox Loaded')
    } catch (error) {
        console.error(error)
    }
}

export function clearDirectMessages(dispatch) {
    try {
        dispatch({ type: CLEAR_DIRECT_MESSAGES })
        console.log('Direct Messages Cleared')
    } catch (error) {
        console.error(error)
    }
}
