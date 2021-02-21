import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useShopState, useShopDispatch } from './context'
import { addToCart, loadStoreGames, setCurrentGame, setAddedToCart } from './context/ShopActions'

import './StoreGamePage.css'

export const ShopGamePage = () => {
    const { game_id } = useParams()
    const { gamePage, storeGames, loading, cart, addedToCart } = useShopState()
    const shopDispatch = useShopDispatch()

    useEffect(() => {
        if (loading) {
            loadStoreGames(shopDispatch)
        }
    }, [loading, shopDispatch])

    useEffect(() => {
        if (!loading) {
            let game = storeGames.filter((game) => game._id === game_id)
            setCurrentGame(shopDispatch, game[0]._id)
        }
    }, [loading, storeGames, shopDispatch, game_id])

    useEffect(() => {
        if (cart.length > 0) {
            let game = cart.filter((game) => game._id === game_id)
            if (game[0]) {
                setAddedToCart(shopDispatch, true)
            } else {
                setAddedToCart(shopDispatch, false)
            }
        }
    }, [cart, game_id, shopDispatch])

    if (gamePage) {
        return (
            <>
                <div
                    className='store-Gamepage'
                    style={{
                        backgroundImage: `url(${gamePage.backgroundimg})`,
                    }}
                >
                    <div className='store-Gamepage-Film'>
                        <div className='globalHeaderL'>
                            <Link
                                to='/shop'
                                className='store-Gamepage-Buttons'
                                style={{
                                    position: 'absolute',
                                    textAlign: 'center',
                                }}
                            >
                                Back
                            </Link>
                            <h1 className='globalHeader Primary-Header'>{gamePage.name}</h1>
                        </div>

                        <div className='store-Gamepage-Grid'>
                            <div className='store-Gamepage-Components'>
                                <div
                                    className='store-Gamepage-Img'
                                    style={{
                                        backgroundImage: `url(${gamePage.wideimg})`,
                                    }}
                                ></div>
                                <div>
                                    <h2 className='globalHeaderL Secondary-Header'>Game Desc:</h2>{' '}
                                    <p className='Tertiary-Header'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, esse. Eius et dolorem aspernatur vitae laudantium magnam
                                        vero natus ab deleniti, voluptate architecto debitis veniam asperiores suscipit, sunt fugit ullam! Lorem ipsum dolor
                                        sit, amet consectetur adipisicing elit. Corrupti, at libero dolor rem vitae, accusantium facilis praesentium illo
                                        voluptates vel repellendus explicabo reprehenderit nam laboriosam repellat blanditiis quod, sit recusandae?
                                    </p>
                                </div>
                            </div>
                            <div className='store-Gamepage-Components'>
                                <div className='store-Gamepage-Subcomponents'>
                                    <div>
                                        <h2 className='globalHeaderL'>
                                            Ratings: <span className='Primary-Header'>4.5</span>
                                        </h2>
                                        <h3 className='globalHeaderL'>
                                            Recent Ratings: <span className='Primary-Header'>4.1</span>
                                        </h3>
                                        <h4 className='globalHeaderL'>
                                            Our Ratings: <span className='Primary-Header'>5</span>
                                        </h4>
                                    </div>
                                    <div>
                                        {addedToCart ? (
                                            <button className='store-Gamepage-Buttons'>Added To Cart</button>
                                        ) : (
                                            <button onClick={() => addToCart(shopDispatch, gamePage._id)} className='store-Gamepage-Buttons'>
                                                Add to cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className='store-Gamepage-Reviews'>
                                    <h2 className='globalHeaderL Secondary-Header'>Review Comments:</h2>
                                    <ul>
                                        <li>
                                            <h5 className='globaHeaderL Tertiary-Header'>
                                                User: <span className='Primary-Header'>BabyJesus</span>
                                            </h5>
                                            <p className='Secondary-Header'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                        <li>
                                            <h5 className='globalHeaderL Tertiary-Header'>
                                                User: <span className='Primary-Header'>Rejis</span>
                                            </h5>
                                            <p className='Secondary-Header'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                        <li>
                                            <h5 className='globalHeaderL Tertiary-Header'>
                                                User: <span className='Primary-Header'>Parathax</span>
                                            </h5>
                                            <p className='Secondary-Header'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                        <li>
                                            <h5 className='globalHeaderL Tertiary-Header'>
                                                User: <span className='Primary-Header'>Flipster</span>
                                            </h5>
                                            <p className='Secondary-Header'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                        <li>
                                            <h5 className='globalHeaderL Tertiary-Header'>
                                                User: <span className='Primary-Header'>Commissar</span>
                                            </h5>
                                            <p className='Secondary-Header'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return null
    }
}
