import {
    SHOW_MODAL_WITH_ADD_SERVER,
    SHOW_MODAL_WITH_ADD_CHANNEL,
    SHOW_MODAL_WITH_EDIT_PROFILE,
    SHOW_MODAL_WITH_SCREENSHOT,
    HIDE_MODAL,
    SHOW_MODAL_WITH_CHANNEL_EDIT,
    SHOW_MODAL_WITH_FRIEND_REQUESTS,
} from './types'

export const initialState = {
    show: false,
    addServer: false,
    addChannel: false,
    editProfile: false,
    screenShot: false,
    channelEdit: false,
    friendRequests: false,
    screenShotLink: null,
}

export const ModalReducer = (initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL_WITH_ADD_SERVER:
            return {
                ...initialState,
                show: true,
                addServer: true,
            }
        case SHOW_MODAL_WITH_ADD_CHANNEL:
            return {
                ...initialState,
                show: true,
                addChannel: true,
            }
        case SHOW_MODAL_WITH_EDIT_PROFILE:
            return {
                ...initialState,
                show: true,
                editProfile: true,
            }
        case SHOW_MODAL_WITH_SCREENSHOT:
            return {
                ...initialState,
                show: true,
                screenShot: true,
                screenShotLink: action.payload,
            }
        case SHOW_MODAL_WITH_CHANNEL_EDIT:
            return {
                ...initialState,
                show: true,
                channelEdit: true,
            }
        case SHOW_MODAL_WITH_FRIEND_REQUESTS:
            return {
                ...initialState,
                show: true,
                friendRequests: true,
            }
        case HIDE_MODAL:
            return {
                ...initialState,
                show: false,
                addServer: false,
                addChannel: false,
                startStream: false,
                editProfile: false,
                screenShot: false,
                channelEdit: false,
                friendRequests: false,
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
