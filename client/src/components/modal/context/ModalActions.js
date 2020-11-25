import {
    SHOW_MODAL_WITH_ADD_SERVER,
    HIDE_MODAL,
    SHOW_MODAL_WITH_ADD_CHANNEL,
    SHOW_MODAL_WITH_EDIT_PROFILE,
    SHOW_MODAL_WITH_SCREENSHOT,
    SHOW_MODAL_WITH_CHANNEL_EDIT,
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

export function showModalWithChannelEdit(dispatch, link) {
    try {
        console.log(link)
        dispatch({ type: SHOW_MODAL_WITH_CHANNEL_EDIT, payload: link })
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
