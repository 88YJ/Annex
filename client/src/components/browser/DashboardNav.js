import React from 'react'
import { useDashState, useDashDispatch, setGames, setFeed } from '../../pages/dashboard/context'

import FeedIcon from '@material-ui/icons/DynamicFeed'
import GamesIcon from '@material-ui/icons/GamesOutlined'

export const DashboardNav = () => {
    const { showFeed, showGames } = useDashState()
    const dashDispatch = useDashDispatch()
    return (
        <div className='dashboard-Nav'>
            <div></div>
            <div className='dashboard-Nav-Buttons'>
                {showFeed ? (
                    <div className='dashboard-Nav-Buttons-Options-Active' onClick={() => setFeed(dashDispatch)}>
                        <FeedIcon />
                        <p>Feed</p>
                    </div>
                ) : (
                    <div className='dashboard-Nav-Buttons-Options' onClick={() => setFeed(dashDispatch)}>
                        <FeedIcon />
                        <p>Feed</p>
                    </div>
                )}
                {showGames ? (
                    <div className='dashboard-Nav-Buttons-Options-Active' onClick={() => setGames(dashDispatch)}>
                        <GamesIcon />
                        <p>Games</p>
                    </div>
                ) : (
                    <div className='dashboard-Nav-Buttons-Options' onClick={() => setGames(dashDispatch)}>
                        <GamesIcon />
                        <p>Games</p>
                    </div>
                )}
            </div>
            <div></div>
        </div>
    )
}
