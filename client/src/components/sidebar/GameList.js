import React from 'react'
import { Link } from 'react-router-dom'

import { useProfileState } from '../../pages/profile/context'

const gameLocation = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Call of Duty Black Ops\\BlackOps.exe'

export const GameList = () => {
    const { ownedGames } = useProfileState()

    const streamGame = () => {
        if (window.process !== undefined && window.process.type === 'renderer') {
            console.log('started game')
            const { ipcRenderer } = window.require('electron')
            setTimeout(() => {
                ipcRenderer.send('game-play', gameLocation)
            }, 1000)

            ipcRenderer.send('game-stream')
        }
    }

    const playGame = () => {
        console.log(window.process)
        if (window.process !== undefined && window.process.type === 'renderer') {
            console.log('started game')
            const { ipcRenderer } = window.require('electron')
            setTimeout(() => {
                ipcRenderer.send('game-play', gameLocation)
            }, 1000)
        }
    }

    if (ownedGames) {
        return (
            <>
                <div className='R-Sidebar-Gamelist'>
                    <h3 className='globalHeader Tertiary-Background Primary-Header Border-Bottom-1PX'>Games:</h3>
                    <div className='gamelist-Games'>
                        <ul>
                            {ownedGames.map((game, i) => (
                                <li
                                    key={i}
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
                                                    <Link className='globalbutton' to='#' onClick={streamGame}>
                                                        Stream
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button className='globalbutton' style={{ height: '37px', width: 'auto' }} onClick={playGame}>
                                                        Play
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )
    } else {
        return null
    }
}
