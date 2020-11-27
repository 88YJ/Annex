import {
    SHOW_MODAL_WITH_ADD_SERVER,
    HIDE_MODAL,
    SHOW_MODAL_WITH_ADD_CHANNEL,
    SHOW_MODAL_WITH_EDIT_PROFILE,
    SHOW_MODAL_WITH_SCREENSHOT,
    SHOW_MODAL_WITH_CHANNEL_EDIT,
    SHOW_MODAL_WITH_FRIEND_REQUESTS,
} from './types'

export function showModalWithAddServer(dispatch) {
    try {
        dispatch({ type: SHOW_MODAL_WITH_ADD_SERVER })
    } catch (error) {
        console.error(error)
    }
}

export function showModalWithAddChannel(dispatch) {
    try {
        dispatch({ type: SHOW_MODAL_WITH_ADD_CHANNEL })
    } catch (error) {
        console.error(error)
    }
}

export function showModalWithEditProfile(dispatch) {
    try {
        dispatch({ type: SHOW_MODAL_WITH_EDIT_PROFILE })
    } catch (error) {
        console.error(error)
    }
}

export function showModalwithScreenshot(dispatch, link) {
    try {
        console.log(link)
        dispatch({ type: SHOW_MODAL_WITH_SCREENSHOT, payload: link })
    } catch (error) {
        console.error(error)
    }
}

export function showModalWithChannelEdit(dispatch) {
    try {
        dispatch({ type: SHOW_MODAL_WITH_CHANNEL_EDIT })
    } catch (error) {
        console.error(error)
    }
}

export function showModalWithFriendRequests(dispatch) {
    try {
        dispatch({ type: SHOW_MODAL_WITH_FRIEND_REQUESTS })
    } catch (error) {
        console.error(error)
    }
}

export function hideModal(dispatch) {
    try {
        dispatch({ type: HIDE_MODAL })
    } catch (error) {
        console.log(error)
    }
}
