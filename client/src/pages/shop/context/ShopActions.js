import { LOAD_STORE_GAMES, ADD_TO_CART, CLEAR_CART, SET_STORE_GAMEPAGE, ADDED_TO_CART, FILTER_STORE_GAMES } from './types'
import axios from 'axios'

const deployedURL = "https://api-dot-ultimate-karma-297923.wl.r.appspot.com"

const requestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export async function loadStoreGames(dispatch) {
    try {
        const response = await axios.get(`${deployedURL}/api/games/FindAll`, requestConfig)
        dispatch({ type: LOAD_STORE_GAMES, payload: response.data })
        console.log('Found All Games')
    } catch (error) {
        console.error(error)
    }
}

export async function setCurrentGame(dispatch, Game) {
    try {
        const res = await axios.get(`${deployedURL}/api/games/FindGame/${Game}`)
        dispatch({ type: SET_STORE_GAMEPAGE, payload: res.data })
    } catch (err) {
        console.log('no games to display')
    }
}

export async function addToCart(dispatch, Game) {
    try {
        const res = await axios.get(`${deployedURL}/api/games/FindGame/${Game}`)
        dispatch({ type: ADD_TO_CART, payload: res.data })
    } catch (error) {
        console.log(error)
    }
}

export async function buyGame(dispatch, Game) {
    try {
        await axios.put(`${deployedURL}api/games/AddGame/${Game}`, requestConfig)
        dispatch({ type: CLEAR_CART })
    } catch (error) {
        console.error(error)
    }
}

export async function setAddedToCart(dispatch, added) {
    try {
        dispatch({ type: ADDED_TO_CART, payload: added })
    } catch (error) {
        console.log(error)
    }
}

export async function filterShop(dispatch, filter) {
    try {
        dispatch({ type: FILTER_STORE_GAMES, payload: filter })
    } catch (error) {
        console.log(error)
    }
}
