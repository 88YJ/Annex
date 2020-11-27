import { REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './types'
import axios from 'axios'

const requestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export async function registerUser(dispatch, registerPayload) {
    try {
        const response = await axios.post('/api/users', registerPayload, requestConfig)
        if (response.data) {
            dispatch({ type: REGISTER_SUCCESS })
            console.log('New user successfully registered.')
        }
    } catch (error) {
        dispatch({ type: REGISTER_ERROR, payload: error.response.data.msg })
    }
}

export async function loginUser(dispatch, loginPayload) {
    try {
        const response = await axios.post('/api/auth', loginPayload, requestConfig)
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('isLoggedIn', true)

            dispatch({ type: LOGIN_SUCCESS, payload: response.data })
            console.log('User successfully logged in.')

            window.location.reload()
        }
    } catch (error) {
        dispatch({ type: LOGIN_ERROR, payload: error.response.data.msg })
    }
}

export async function reloadUser(dispatch) {
    try {
        const response = await axios.get('/api/auth', requestConfig)
        if (response.data) {
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))

            console.log('User successfully reloaded')

            window.location.reload()
        }
    } catch (error) {
        console.log(error)
    }
}

export function logout(dispatch) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.setItem('isLoggedIn', false)

    dispatch({ type: LOGOUT })
    console.log('User successfully logged out.')

    window.location.reload()
}
