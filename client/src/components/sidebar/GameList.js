import React from 'react'
import { Link } from 'react-router-dom'
import { useProfileState, useProfileDispatch, loadLocalGames } from '../../pages/profile/context'
import { useAuthState } from '../../pages/authentication/context'
import PlusIcon from '../../images/PlusIcon.png'

let gameLocation = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Dust An Elysian Tail\\DustAET.exe'

export const GameList = () => {
    const { ownedGames, localGames, ownedGamesLoaded } = useProfileState()
    const profileDispatch = useProfileDispatch()
    const { electron } = useAuthState()

    const playGame = async (gameLocation) => {
        if (electron) {
            const { ipcRenderer } = window.require('electron')
            let response = await ipcRenderer.invoke('game-play', gameLocation)

            console.log(`${response.windowTitle} is running`)

            for(let i = 0; i < localGames.length; i++) {
                if(localGames[i].path === gameLocation) {

                    let {path, icon} = localGames[i]
                    let gameData = {
                        path: path,
                        icon: icon,
                        name: response.windowTitle
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

            let { icon, path } = response

            localGames.push({ path: path, icon: icon })
            localStorage.setItem('localGames', JSON.stringify(localGames))

            loadLocalGames(profileDispatch)
        }
    }

    if (ownedGames && ownedGamesLoaded) {
        return (
            <>
                <div className='R-Sidebar-Gamelist'>
                    <h3 className='globalHeader Tertiary-Background Primary-Header Border-Bottom-1PX'>Games:</h3>
                    <div className='gamelist-Games'>
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
                                            <ul>
                                                <li>
                                                    <Link className='globalbutton' to='#' onClick={() => streamGame(gameLocation)}>
                                                        Stream
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        className='globalbutton'
                                                        style={{ height: '37px', width: 'auto' }}
                                                        onClick={() => playGame(gameLocation)}
                                                    >
                                                        Play
                                                    </button>
                                                </li>
                                            </ul>
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
                                                backgroundImage: `url('https://simtrucker.1001watt.no/wp-content/themes/blackfyre/img/defaults/default-banner.jpg')`,
                                            }}
                                        >
                                            <div className='banner-Film'>
                                                <ul style={{ height: '30px', display: 'inline-flex', margin: '0', padding: '0' }}>
                                                    <li
                                                        style={{
                                                            backgroundImage: `url(${game.icon})`,
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            height: '25px',
                                                            width: '25px',
                                                            float: 'left',
                                                            listStyle: 'inherit',
                                                        }}
                                                    ></li>
                                                    <li style={{ height: 'auto', float: 'left' }}>
                                                        <p style={{ fontSize: '16px', height: 20, opacity: '1' }}>{game.name ? game.name : game.path}</p>
                                                    </li>
                                                </ul>

                                                <div className='games-Submenu' style={{ marginTop: '0' }}>
                                                    <ul style={{ marginTop: '0' }}>
                                                        <li style={{ marginTop: '0' }}>
                                                            <Link className='globalbutton' to='#' onClick={() => streamGame(game.path)}>
                                                                Stream
                                                            </Link>
                                                        </li>
                                                        <li style={{ marginTop: '0' }}>
                                                            <button
                                                                className='globalbutton'
                                                                style={{ height: '37px', width: 'auto' }}
                                                                onClick={() => playGame(game.path)}
                                                            >
                                                                Play
                                                            </button>
                                                        </li>
                                                    </ul>
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
        )
    } else {
        return null
    }
}
