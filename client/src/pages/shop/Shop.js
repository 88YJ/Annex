import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShopState, useShopDispatch, filterShop } from './context'
import { loadStoreGames } from './context/ShopActions'

import './Store.css'

export const Shop = () => {
    const { storeGames, filtered, loading } = useShopState()

    const shopDispatch = useShopDispatch()

    const [search, setSearch] = useState('')

    useEffect(() => {
        if (loading) {
            loadStoreGames(shopDispatch)
        }
    }, [loading, shopDispatch])

    const onChange = (e) => {
        setSearch(e.target.value)
        if (search !== '') {
            filterShop(shopDispatch, search)
        }
    }

    function resetSearch() {
        filterShop(shopDispatch, '')
        setSearch('')
    }

    if (storeGames) {
        return (
            <>
                <div className='store-Nav'>
                    <ul>
                        <li>
                            <input value={search} onChange={onChange} className='store-Searchbar' placeholder='Search Games' />
                        </li>
                        <li>
                            <Link to='#' onClick={() => resetSearch()} style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                                Clear Filter
                            </Link>
                        </li>
                        <li>
                            <Link to='#' style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                                Selected For You
                            </Link>
                        </li>
                        <li>
                            <Link to='#' style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                                Popular Games
                            </Link>
                        </li>
                        <li>
                            <Link to='#' style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                                Community
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='store-Listpage'>
                    <ul>
                        {filtered !== null
                            ? filtered.map((games, i) => (
                                  <Link to={`/shop/page/${games._id}`} key={i}>
                                      <li>
                                          <div
                                              className='store-GamesImg'
                                              style={{
                                                  backgroundImage: `url(${games.img})`,
                                              }}
                                          ></div>
                                      </li>
                                  </Link>
                              ))
                            : storeGames.map((games, i) => (
                                  <Link to={`/shop/page/${games._id}`} key={i}>
                                      <li>
                                          <div
                                              className='store-GamesImg'
                                              style={{
                                                  backgroundImage: `url(${games.img})`,
                                              }}
                                          ></div>
                                      </li>
                                  </Link>
                              ))}
                    </ul>
                </div>
            </>
        )
    } else return null
}
