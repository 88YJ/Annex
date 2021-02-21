import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useProfileState, useProfileDispatch, loadLocalGames } from '../../pages/profile/context'
import { useAuthState } from '../../pages/authentication/context'
import PlusIcon from '../../images/PlusIcon.png'

import { StreamChat } from '../sidebar/StreamChat'

import Pinned from '@material-ui/icons/PlaylistAddCheckOutlined'

import './PinnedGames.css'

let gameLocation = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Dust An Elysian Tail\\DustAET.exe'

export const PinnedGames = () => {
    const history = useHistory()
    const { ownedGames, localGames, ownedGamesLoaded } = useProfileState()
    const profileDispatch = useProfileDispatch()
    const { electron } = useAuthState()
    const [showStreamChat, setShowStreamChat] = useState(false)

    useEffect(() => {
        return history.listen((location) => {
            if (location.pathname.indexOf('/stream') === -1) {
                setShowStreamChat(false)
            } else {
                setShowStreamChat(true)
            }
        })
    }, [history])

    console.log(showStreamChat)

    const playGame = async (gameLocation) => {
        if (electron) {
            const { ipcRenderer } = window.require('electron')
            let response = await ipcRenderer.invoke('game-play', gameLocation)

            console.log(`${response.windowTitle} is running`)

            for (let i = 0; i < localGames.length; i++) {
                if (localGames[i].path === gameLocation) {
                    let { path, icon, name, wideImg } = localGames[i]
                    let gameData = {
                        path: path,
                        icon: icon,
                        name: name ? name : response.windowTitle,
                        wideImg: wideImg,
                    }

                    localGames[i] = gameData
                    console.log(localGames[i])
                    break
                }
            }

            console.log(localGames)

            localStorage.setItem('localGames', JSON.stringify(localGames))
            loadLocalGames(profileDispatch)

            return response
        }
    }

    const streamGame = async (gameLocation) => {
        if (electron) {
            const { ipcRenderer } = window.require('electron')

            let game = await playGame(gameLocation)
            let response = await ipcRenderer.invoke('game-stream', game)

            console.log(`${response} is running`)
            console.log(`${game} is streaming`)
        }
    }

    const addLocalGame = async () => {
        if (electron) {
            const { ipcRenderer } = window.require('electron')
            let response = await ipcRenderer.invoke('game-local-add')

            if (response === undefined) {
                return
            }

            let { icon, path, name, wideImg } = response

            localGames.push({ path: path, icon: icon, name: name, wideImg: wideImg })
            localStorage.setItem('localGames', JSON.stringify(localGames))

            loadLocalGames(profileDispatch)
        }
    }

    if (ownedGames && ownedGamesLoaded) {
        return (
            <>
                {!showStreamChat ? (
                    <>
                        <div className='Pinned_GameList'>
                            <div className='Pinned_Games_Title'>
                                <Pinned />
                                <p>Pinned</p>
                            </div>
                            <div className='Pinned_GameList_Games'>
                                <ul>
                                    {ownedGames.map((game) => (
                                        <li
                                            key={game._id}
                                            className='banner'
                                            style={{
                                                backgroundImage: `url(${game.banner})`,
                                            }}
                                        >
                                            <div className='banner-Film'>
                                                <Link to={`/game/${game._id}`} style={{ fontSize: '16px', height: 20, width: 'auto' }}>
                                                    {game.name}
                                                </Link>
                                                <div className='games-Submenu'>
                                                    <button className='gamesButton' onClick={() => streamGame(gameLocation)}>
                                                        Stream
                                                    </button>

                                                    <button className='gamesButton' onClick={() => playGame(gameLocation)}>
                                                        Play
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {electron && (
                                        <>
                                            {localGames.map((game, i) => (
                                                <li
                                                    key={i}
                                                    className='banner'
                                                    style={{
                                                        backgroundImage: `url(${
                                                            game.wideImg
                                                                ? game.wideImg
                                                                : 'https://simtrucker.1001watt.no/wp-content/themes/blackfyre/img/defaults/default-banner.jpg'
                                                        })`,
                                                    }}
                                                >
                                                    <div className='banner-Film'>
                                                        <div className='Local_Game_Name'>
                                                            <img src={game.icon} alt='' />
                                                            <p>{game.name ? game.name : game.path}</p>
                                                        </div>

                                                        <div className='games-Submenu'>
                                                            <button className='gamesButton' onClick={() => streamGame(game.path)}>
                                                                Stream
                                                            </button>

                                                            <button className='gamesButton' onClick={() => playGame(game.path)}>
                                                                Play
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                            <li style={{ cursor: 'pointer' }}>
                                                <div className='NavIcons' style={{ backgroundImage: `url(${PlusIcon})` }} onClick={addLocalGame} />
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (
                    <StreamChat />
                )}
            </>
        )
    } else {
        return null
    }
}
