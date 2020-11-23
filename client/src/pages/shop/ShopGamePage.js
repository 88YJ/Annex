import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useShopState, useShopDispatch } from './context'
import { addToCart, loadStoreGames, setCurrentGame, setAddedToCart } from './context/ShopActions'
import { style } from '../../css/CustomStyling'

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
                                className='globalbutton'
                                style={{
                                    position: 'absolute',
                                    width: 'auto',
                                    height: 'auto',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                Back
                            </Link>
                            <h1 className='globalHeader' style={{ color: `${style.primaryHeader}` }}>
                                {gamePage.name}
                            </h1>
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
                                    <h2 className='globalHeaderL' style={{ color: `${style.secondaryHeader}` }}>
                                        Game Desc:
                                    </h2>{' '}
                                    <p style={{ color: `${style.tertiaryHeader}` }}>
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
                                            Ratings: <span style={{ color: `${style.primaryHeader}` }}>4.5</span>
                                        </h2>
                                        <h3 className='globalHeaderL'>
                                            Recent Ratings: <span style={{ color: `${style.primaryHeader}` }}>4.1</span>
                                        </h3>
                                        <h4 className='globalHeaderL'>
                                            Our Ratings: <span style={{ color: `${style.primaryHeader}` }}>5</span>
                                        </h4>
                                    </div>
                                    <div>
                                        {addedToCart ? (
                                            <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                                                Added
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(shopDispatch, gamePage._id)}
                                                style={{ height: 'auto', width: 'auto' }}
                                                className='globalbutton'
                                            >
                                                Add to cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className='store-Gamepage-Reviews'>
                                    <h2 className='globalHeaderL' style={{ color: `${style.secondaryHeader}` }}>
                                        Review Comments:
                                    </h2>
                                    <ul>
                                        <li>
                                            <h5 className='globaHeaderL' style={{ color: `${style.tertiaryHeader}` }}>
                                                User: <span style={{ color: `${style.primaryHeader}` }}>BabyJesus</span>
                                            </h5>
                                            <p style={{ color: `${style.secondaryHeader}` }}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                        <li>
                                            <h5 className='globalHeaderL' style={{ color: `${style.tertiaryHeader}` }}>
                                                User: <span style={{ color: `${style.primaryHeader}` }}>Rejis</span>
                                            </h5>
                                            <p style={{ color: `${style.secondaryHeader}` }}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                        <li>
                                            <h5 className='globalHeaderL' style={{ color: `${style.tertiaryHeader}` }}>
                                                User: <span style={{ color: `${style.primaryHeader}` }}>Parathax</span>
                                            </h5>
                                            <p style={{ color: `${style.secondaryHeader}` }}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                        <li>
                                            <h5 className='globalHeaderL' style={{ color: `${style.tertiaryHeader}` }}>
                                                User: <span style={{ color: `${style.primaryHeader}` }}>Flipster</span>
                                            </h5>
                                            <p style={{ color: `${style.secondaryHeader}` }}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem quasi fuga laudantium ipsam ut earum
                                                laborum laboriosam, consectetur reiciendis odit voluptates? Velit voluptates, non sunt dicta animi repudiandae
                                                voluptatibus?
                                            </p>
                                        </li>
                                        <li>
                                            <h5 className='globalHeaderL' style={{ color: `${style.tertiaryHeader}` }}>
                                                User: <span style={{ color: `${style.primaryHeader}` }}>Commissar</span>
                                            </h5>
                                            <p style={{ color: `${style.secondaryHeader}` }}>
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
