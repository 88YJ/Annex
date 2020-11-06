import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShopState, useShopDispatch } from './context';
import { loadStoreGames } from './context/ShopActions';

export const Shop = () => {
  const { storeGames, loading } = useShopState();

  const shopDispatch = useShopDispatch();

  useEffect(() => {
    if (loading) {
      loadStoreGames(shopDispatch);
    }
  }, [loading, shopDispatch]);

  if (storeGames) {
    return (
      <>
        <div className='store-Nav'>
          <ul>
            <li>
              <input /*type={text} onChange={onChange}*/ className='store-Searchbar' placeholder='Search Games' />
            </li>
            <li>
              <Link to='#' style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
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
            {storeGames.map((games, i) => (
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
    );
  } else return <div>empty yay</div>;
};
