import { GET_POSTS, SET_FEED_DISPLAY, SET_GAMES_DISPLAY } from './types'
import axios from 'axios'

const requestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export async function getPosts(dispatch) {
    try {
        const response = await axios.get('/api/feed', requestConfig)
        dispatch({ type: GET_POSTS, payload: response.data.reverse() })
        console.log('Captured Posts..')
    } catch (error) {
        console.log(error)
    }
}

export async function sendPosts(dispatch, post) {
    try {
        await axios.post('/api/feed', post, requestConfig)

        console.log('Post Created..')
    } catch (error) {
        console.error(error)
    }
}

export async function setFeed(dispatch) {
    try {
        dispatch({ type: SET_FEED_DISPLAY })
    } catch (error) {
        console.error(error)
    }
}

export async function setGames(dispatch) {
    try {
        dispatch({ type: SET_GAMES_DISPLAY })
    } catch (error) {
        console.error(error)
    }
}
