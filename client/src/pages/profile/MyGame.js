import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useProfileState, useProfileDispatch, loadOwnedCurrentGame, findOwnedGames } from './context'
import { FriendList } from '../../components/sidebar/FriendList'

export const MyGame = () => {
    const { CurrentOwnedGame, ownedGamesLoaded, ownedGames } = useProfileState()
    const profileDispatch = useProfileDispatch()
    const { game_id } = useParams()

    useEffect(() => {
        if (!ownedGamesLoaded) {
            findOwnedGames(profileDispatch)
        }
    }, [ownedGamesLoaded, profileDispatch])

    useEffect(() => {
        if (ownedGamesLoaded) {
            let game = ownedGames.filter((game) => game._id === game_id)
            loadOwnedCurrentGame(profileDispatch, game[0]._id)
        }
    }, [ownedGamesLoaded, ownedGames, profileDispatch, game_id])

    if (CurrentOwnedGame) {
        return (
            <>
                <div className='Gamepage'>
                    <div className='Gamepage-Banner'>
                        <div />
                        <div className='Gamepage-Img' style={{ backgroundImage: `url(${CurrentOwnedGame.banner})` }} />
                        <div />
                    </div>
                    <div className='Gamepage-Nav'>
                        <h1 className='globalHeader Tertiary-Background Primary-Header'>{CurrentOwnedGame.name}</h1>
                        <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                            Play
                        </button>
                        <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                            Download
                        </button>
                        <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                            Store Page
                        </button>
                        <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                            Forum
                        </button>
                        <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                            Support
                        </button>
                    </div>
                    <div className='Gamepage-Body'>
                        <div className='Gamepage-Lists'>
                            <ul className='Border-Right-2PX'>
                                <FriendList />
                            </ul>
                            <ul className='Border-Right-2PX'>
                                <li>
                                    <h3>Friend Achievements:</h3>
                                </li>
                                <li
                                    className='banner'
                                    style={{
                                        backgroundImage: `url('https://png.pngtree.com/thumb_back/fw800/back_our/20190625/ourmid/pngtree-red-flame-burning-game-banner-background-image_259947.jpg')`,
                                    }}
                                >
                                    <div
                                        className='profilepicture'
                                        style={{ backgroundImage: `url('https://www.famousbirthdays.com/faces/marshmello-image.jpg')` }}
                                    />
                                    <Link to='#' style={{ background: 'rgb(0,0,0,.9)' }}>
                                        Parathax
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='Gamepage-News-Container'>
                            <div className='Gamepage-News'>
                                <h2 className='globalHeaderL'>Game News:</h2>
                                <ul>
                                    <li>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente magnam neque sed facere laboriosam iusto
                                            repudiandae et eius eos soluta recusandae reiciendis numquam, quo dolores veritatis. Ad laborum incidunt officia.
                                        </p>
                                        <h4 className='globalHeaderL Primary-Header'>04/25/3001</h4>
                                    </li>
                                    <li>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente magnam neque sed facere laboriosam iusto
                                            repudiandae et eius eos soluta recusandae reiciendis numquam, quo dolores veritatis. Ad laborum incidunt officia.
                                        </p>
                                        <h4 className='globalHeaderL Primary-Header'>07/05/3001</h4>
                                    </li>
                                    <li>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente magnam neque sed facere laboriosam iusto
                                            repudiandae et eius eos soluta recusandae reiciendis numquam, quo dolores veritatis. Ad laborum incidunt officia.
                                        </p>
                                        <h4 className='globalHeaderL Primary-Header'>12/31/3001</h4>
                                    </li>
                                </ul>
                            </div>
                            <div className='Gamepage-News'>
                                <h2 style={{ height: 'auto' }}>Patch Notes:</h2>
                                <ul>
                                    <li style={{ height: 'auto', width: 'auto' }}>
                                        <h4 className='Primary-Header' style={{ height: 'auto' }}>
                                            7.05
                                        </h4>
                                        <p style={{ height: 'auto' }}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis repellat modi perferendis impedit soluta aliquid
                                            unde ea nihil ex doloribus distinctio eaque dolore, suscipit, quisquam adipisci fugiat sed fuga. Libero!
                                        </p>
                                    </li>
                                    <li style={{ height: 'auto' }}>
                                        <h4 className='Primary-Header' style={{ height: 'auto' }}>
                                            7.06
                                        </h4>
                                        <p style={{ height: 'auto' }}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis repellat modi perferendis impedit soluta aliquid
                                            unde ea nihil ex doloribus distinctio eaque dolore, suscipit, quisquam adipisci fugiat sed fuga. Libero!
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                );
            </>
        )
    } else {
        return null
    }
}
