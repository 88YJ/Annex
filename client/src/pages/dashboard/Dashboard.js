import React, { useEffect } from 'react'
import { Carousel } from '../../components/browser/Carousel'
import { Feed } from '../../components/browser/Feed'
import { DashboardNav } from '../../components/browser/DashboardNav'
import { OwnedGames } from '../../components/browser/OwnedGames'
import { CAROUSEL_DASHBOARD } from '../../components/browser/types/types'
import { useSideBarDispatch, showFriends, showGames } from '../../components/sidebar/context'
import { useDashState } from '../../pages/dashboard/context'

import './Dashboard.css'

export const Dashboard = () => {
    const { showFeed } = useDashState()
    const sidebarDispatch = useSideBarDispatch()
    useEffect(() => {
        showFriends(sidebarDispatch)
        showGames(sidebarDispatch)
    }, [sidebarDispatch])

    return (
        <div className='dashboard'>
            <DashboardNav />
            {showFeed ? (
                <Feed />
            ) : (
                <>
                    {/* <h1 className='globalHeader Primary-Header'>Dashboard!</h1>
                    <div className='dashboard-Grid'>
                        <Carousel type={CAROUSEL_DASHBOARD} />
                    </div> */}
                    <OwnedGames />
                </>
            )}
        </div>
    )
}
