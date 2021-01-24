import React from 'react'
import { Link } from 'react-router-dom'
import { useProfileState, useProfileDispatch, loadLocalGames } from '../../pages/profile/context'

let gameLocation = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Dust An Elysian Tail\\DustAET.exe'

export const GameList = () => {
    const { ownedGames, localGames } = useProfileState()
    const profileDispatch = useProfileDispatch()

    const playGame = (gameLocation) => {
        if (window.process !== undefined && window.process.type === 'renderer') {
            const { ipcRenderer } = window.require('electron')
            setTimeout(() => {
                ipcRenderer.send('game-play', gameLocation)
            }, 1000)
            console.log('game is running')
            ipcRenderer.send("game-stream")
        }
    }

    const addLocalGame = async () => {
        if (window.process !== undefined && window.process.type === 'renderer') {
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

    if (ownedGames) {
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
                                        <p style={{ fontSize: '16px', height: 20 }}>{game.name}</p>
                                        <div className='games-Submenu'>
                                            <ul>
                                                <li>
                                                    <Link to={`/game/${game._id}`} className='globalbutton'>
                                                        Game Page
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button className='globalbutton' style={{ height: '37px', width: 'auto' }} onClick={() => playGame(gameLocation)}>
                                                        Play
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {localGames.map((game, i) => (
                                <li
                                    key={i}
                                    className='banner'
                                    style={{
                                        backgroundImage: `url(${game.icon})`,
                                    }}
                                >
                                    <div className='banner-Film'>
                                        <p style={{ fontSize: '16px', height: 20 }}>{game.Path}</p>
                                        <div className='games-Submenu'>
                                            <ul>
                                                <li>
                                                    <button className='globalbutton' style={{ height: '37px', width: 'auto' }} onClick={() => playGame(game.path)}>
                                                        Play
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <button className='globalbutton' style={{ height: '37px', width: 'auto' }} onClick={addLocalGame}>
                                    Add Game
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    } else {
        return null
    }
}
