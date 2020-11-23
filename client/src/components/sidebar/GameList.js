import React from 'react'
import { Link } from 'react-router-dom'
import { style } from '../../css/CustomStyling'

import { useProfileState } from '../../pages/profile/context'

export const GameList = () => {
    const { ownedGames } = useProfileState()

    if (ownedGames) {
        return (
            <>
                <div className='R-Sidebar-Gamelist'>
                    <h3
                        className='globalHeader'
                        style={{
                            background: `${style.tertiaryBackground}`,
                            color: `${style.primaryHeader}`,
                            borderBottom: `${style.secondaryOutLine} 1px solid`,
                        }}
                    >
                        Games:
                    </h3>
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
                                                    <button className='globalbutton' style={{ height: '37px', width: 'auto' }}>
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
