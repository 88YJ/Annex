import { CAPTURE_FRIENDS, CAPTURE_PROFILES, LOAD_CURRENT_PROFILE, CAPTURE_GAMES, SET_OWNED_CURRENT_GAME, GET_INCOMING_FRIEND_REQUESTS } from './types'
import axios from 'axios'

const requestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export async function getFriends(dispatch) {
    try {
        const response = await axios.get('/api/users/friends', requestConfig)
        dispatch({ type: CAPTURE_FRIENDS, payload: response.data })
        console.log('Captured Friends..')
    } catch (error) {
        console.log(error)
    }
}

export async function getProfiles(dispatch) {
    try {
        const response = await axios.get('/api/users/profile', requestConfig)
        dispatch({ type: CAPTURE_PROFILES, payload: response.data })
        console.log('Captured Profiles..')
    } catch (error) {
        console.log(error)
    }
}

export async function loadCurrentProfile(dispatch, profile) {
    try {
        const response = await axios.get(`/api/users/profile/${profile}`, requestConfig)
        dispatch({ type: LOAD_CURRENT_PROFILE, payload: response.data })
        console.log('Profile Loaded..')
    } catch (error) {
        console.log(error)
    }
}

export async function findOwnedGames(dispatch) {
    try {
        const res = await axios.get(`/api/games/CaptureGames`)
        dispatch({ type: CAPTURE_GAMES, payload: res.data })
        console.log('Captured Profile Games..')
    } catch (error) {
        console.log(error)
    }
}

export async function loadOwnedCurrentGame(dispatch, Game) {
    try {
        const res = await axios.get(`/api/games/FindGame/${Game}`)
        dispatch({ type: SET_OWNED_CURRENT_GAME, payload: res.data })
        console.log('Captured Owned Current Game..')
    } catch (error) {
        console.log(error)
    }
}

export async function editProfile(dispatch, info) {
    try {
        await axios.put(`/api/users/editprofile`, info, requestConfig)

        console.log('profile edited')
    } catch (error) {
        console.log(error)
    }
}

export async function editScheme(dispatch, info) {
    try {
        await axios.put(`/api/users/editscheme`, info, requestConfig)

        console.log('scheme edited')
    } catch (error) {
        console.log(error)
    }
}

export async function getIncomingFriendRequests(dispatch) {
    try {
        const res = await axios.get('/api/users/friendrequests', requestConfig)
        dispatch({ type: GET_INCOMING_FRIEND_REQUESTS, payload: res.data })
        console.log('got incoming requests')
    } catch (error) {
        console.log(error)
    }
}

export async function sendFriendRequest(dispatch, profile) {
    try {
        await axios.put(`/api/users/sendfriendrequest/${profile}`, requestConfig)

        console.log('sent friend requests')
    } catch (error) {
        console.log(error)
    }
}

export async function acceptFriendRequest(dispatch, request) {
    try {
        await axios.put(`/api/users/acceptfriendrequest/${request}`, requestConfig)
        const res = await axios.get('/api/users/friendrequests', requestConfig)
        dispatch({ type: GET_INCOMING_FRIEND_REQUESTS, payload: res.data })

        console.log('accepted friend requests')
    } catch (error) {
        console.log(error)
    }
}

export async function sendComment(dispatch, profile, comment) {
    try {
        await axios.put(`/api/users/sendcomment/${profile}`, comment, requestConfig)

        console.log('sent comment')
    } catch (error) {
        console.log(error)
    }
}

export async function joinServer(dispatch, server) {
    try {
        const response = await axios.put(`/api/users/joinserver/${server}`, requestConfig)

        if (response.data) {
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))

            console.log('User successfully reloaded')
        }
        console.log('joined server')
    } catch (error) {
        console.log(error)
    }
}
