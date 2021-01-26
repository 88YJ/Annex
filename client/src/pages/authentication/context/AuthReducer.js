import { REGISTER_SUCCESS, REGISTER_ERROR, REQUEST_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './types'

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined
let token = localStorage.getItem('token') ? localStorage.getItem('token') : undefined
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false
let electron = window.process !== undefined && window.process.type === 'renderer' ? true : false

export const initialState = {
    user: user,
    token: token,
    isLoggedIn: isLoggedIn,
    loading: false,
    electron: electron,
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                isLoggedIn: true,
            }
        case REGISTER_ERROR:
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error,
            }
        case REQUEST_LOGIN:
            return {
                ...initialState,
                loading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                isLoggedIn: true,
            }
        case LOGIN_ERROR:
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error,
            }
        case LOGOUT:
            return {
                ...initialState,
                user: '',
                token: '',
                isLoggedIn: false,
            }

        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

if (user && user.colorScheme.primaryHeader) {
    document.documentElement.style.setProperty('--Primary-Header-Color', user.colorScheme.primaryHeader)
}
if (user && user.colorScheme.secondaryHeader) {
    document.documentElement.style.setProperty('--Secondary-Header-Color', user.colorScheme.secondaryHeader)
}
if (user && user.colorScheme.tertiaryHeader) {
    document.documentElement.style.setProperty('--Tertiary-Header-Color', user.colorScheme.tertiaryHeader)
}
if (user && user.colorScheme.outLine) {
    document.documentElement.style.setProperty('--outLine', user.colorScheme.outLine)
}
if (user && user.colorScheme.secondaryOutline) {
    document.documentElement.style.setProperty('--Seconary-Outline-Color', user.colorScheme.secondaryOutline)
}
if (user && user.colorScheme.activeOutline) {
    document.documentElement.style.setProperty('--Active-Outline-Color', user.colorScheme.activeOutline)
}
if (user && user.colorScheme.tint) {
    document.documentElement.style.setProperty('--Tint', user.colorScheme.tint)
}
if (user && user.primaryBackground) {
    document.documentElement.style.setProperty('--Primary-Background-Color', user.colorScheme.primaryBackground)
}
if (user && user.secondaryBackground) {
    document.documentElement.style.setProperty('--Secondary-Background-Color', user.colorScheme.secondaryBackground)
}
if (user && user.tertiaryBackground) {
    document.documentElement.style.setProperty('--Tertiary-Background-Color', user.colorScheme.tertiaryBackground)
}
