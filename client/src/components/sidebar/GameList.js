import React from 'react'
import { Link } from 'react-router-dom'

import { useProfileState } from '../../pages/profile/context'

const gameLocation = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Dust An Elysian Tail\\DustAET.exe'

export const GameList = () => {
    const { ownedGames } = useProfileState()

    const playGame = () => {
         if(process.version.hasOwnProperty('electron')) {

            const { ipcRenderer } = window.require('electron')
            setTimeout(() => {
                ipcRenderer.send('game-play', gameLocation)
            }, 1000);
            
            ipcRenderer.send("game-stream")
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
                                                    <Link to={`/game/${game._id}`} className='globalbutton'>
                                                        Game Page
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
