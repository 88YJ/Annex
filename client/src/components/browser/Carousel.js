import React from 'react'
import { Card } from './Card'
import Arrow from '../../images/Arrow.png'
import { SHOW_GAMES, SHOW_STREAMS, SHOW_SCREENSHOTS, CAROUSEL_SCREENSHOT, CAROUSEL_DASHBOARD } from './types/types'
import LeftArrow from '@material-ui/icons/KeyboardArrowLeftOutlined'
import RightArrow from '@material-ui/icons/KeyboardArrowRightOutlined'

export const Carousel = (props) => {
    const { type } = props

    var streamRef = React.createRef()
    var gamesRef = React.createRef()
    var screenshotRef = React.createRef()

    function nextClick(reference) {
        let slide

        if (reference === 'stream') {
            slide = streamRef.current
        } else if (reference === 'game') {
            slide = gamesRef.current
        } else if (reference === 'screenshot') {
            slide = screenshotRef.current
        }

        slide.scrollLeft += slide.offsetWidth
        if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
            slide.scrollLeft = 0
        }
    }
    function prevClick(reference) {
        let slide

        if (reference === 'stream') {
            slide = streamRef.current
        } else if (reference === 'game') {
            slide = gamesRef.current
        } else if (reference === 'screenshot') {
            slide = screenshotRef.current
        }

        slide.scrollLeft -= slide.offsetWidth
        if (slide.scrollLeft <= 0) {
            slide.scrollLeft = slide.scrollWidth
        }
    }

    switch (type) {
        case CAROUSEL_DASHBOARD:
            return (
                <>
                    <div className='dashboard-Trending'>
                        <h2 className='sticky globalHeader Secondary-Header'>Trending Streams For You!</h2>
                        <div className='wrapper'>
                            <div className='trendy' ref={streamRef}>
                                <Card type={SHOW_STREAMS} />
                            </div>
                            <div className='row'>
                                <div className='prev' onClick={() => prevClick('stream')}>
                                    <img src={Arrow} alt='' />
                                </div>
                                <div className='next' onClick={() => nextClick('stream')}>
                                    <img src={Arrow} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-Trending'>
                        <h2 className='sticky globalHeader Secondary-Header'>Trending Games For You!</h2>
                        <div className='wrapper'>
                            <div className='trendy' ref={gamesRef}>
                                <Card type={SHOW_GAMES} />
                            </div>
                            <div className='row'>
                                <div className='prev' onClick={() => prevClick('game')}>
                                    <img src={Arrow} alt='' />
                                </div>
                                <div className='next' onClick={() => nextClick('game')}>
                                    <img src={Arrow} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        case CAROUSEL_SCREENSHOT:
            return (
                <div className='profile-Screenshots-Container'>
                    <h2 className='globalHeader sticky Primary-Header'>Showcase</h2>
                    <div className='wrapper'>
                        <div className='trendy' ref={screenshotRef}>
                            <Card type={SHOW_SCREENSHOTS} />
                        </div>
                        <div className='row'>
                            <div className='prev' onClick={() => prevClick('screenshot')}>
                                <LeftArrow className='CarouselArrows' />
                            </div>
                            <div className='next' onClick={() => nextClick('screenshot')}>
                                <RightArrow className='CarouselArrows' />
                            </div>
                        </div>
                    </div>
                </div>
            )

        default:
            return null
    }
}
