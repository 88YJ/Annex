import { GET_POSTS, SET_FEED_DISPLAY, SET_GAMES_DISPLAY } from './types'

export const initialState = {
    trendgames: [
        {
            name: 'Halo 4',
            img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
        },
        {
            name: 'Skyrim',
            img: 'https://img-eshop.cdn.nintendo.net/i/3a41386d4b0999365727a21cc5c13853cfc244abca39b689bb79a339601e48c3.jpg?w=1000',
        },
        {
            name: 'Star Wars:BattleFront II',
            img:
                'https://media.contentapi.ea.com/content/dam/walrus/en-us/migrated-images/2017/04/reveal-swbf2-fb-meta-image-alt.png.adapt.crop191x100.1200w.png',
        },
        {
            name: 'Call of Duty: Black Ops 4',
            img:
                'https://i1.wp.com/therefinedgeek.com.au/wp-content/uploads/2018/10/Call-of-Duty-Black-Ops-4-Review-Screenshot-Wallpaper-Title-Screen.jpg?ssl=1',
        },
        {
            name: 'Warframe',
            img: 'https://www.androidcentral.com/sites/androidcentral.com/files/styles/mediumplus/public/article_images/2020/07/warframe-image.jpg',
        },
    ],
    trendstream: [
        {
            name: 'Ninja',
            img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
        },
        {
            name: 'Shroud',
            img: 'https://img1.looper.com/img/gallery/how-much-did-shroud-really-make-from-mixer/intro-1593116396.jpg',
        },
        {
            name: 'Dr. Disrespect',
            img: 'https://cdn1.dotesports.com/wp-content/uploads/2019/11/13100524/drdisrespect-screengrab.jpg',
        },
        {
            name: 'Summit1g',
            img: 'https://cdn1.dotesports.com/wp-content/uploads/2018/12/26150907/summit1g.png',
        },
        {
            name: 'Dr. Lupo',
            img: 'https://image.cnbcfm.com/api/v1/image/106091661-1566476702259drlupo-rogue-2.jpg?v=1566476731&w=678&h=381',
        },
        {
            name: 'Lost in our Stars',
            img: 'https://wallpaperaccess.com/full/1584309.jpg',
        },
        {
            name: 'Music On Demand',
            img: 'https://wallpapercave.com/wp/EB4mmfb.jpg',
        },
        {
            name: 'April',
            img: 'https://wallpaperaccess.com/full/44729.jpg',
        },
        {
            name: 'Ninja',
            img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
        },
        {
            name: 'Shroud',
            img: 'https://img1.looper.com/img/gallery/how-much-did-shroud-really-make-from-mixer/intro-1593116396.jpg',
        },
        {
            name: 'Dr. Disrespect',
            img: 'https://cdn1.dotesports.com/wp-content/uploads/2019/11/13100524/drdisrespect-screengrab.jpg',
        },
        {
            name: 'Summit1g',
            img: 'https://cdn1.dotesports.com/wp-content/uploads/2018/12/26150907/summit1g.png',
        },
        {
            name: 'Dr. Lupo',
            img: 'https://image.cnbcfm.com/api/v1/image/106091661-1566476702259drlupo-rogue-2.jpg?v=1566476731&w=678&h=381',
        },
        {
            name: 'Lost in our Stars',
            img: 'https://wallpaperaccess.com/full/1584309.jpg',
        },
    ],
    feed: [
        {
            name: '88YJ',
            profilePicture:
                'https://fsb.zobj.net/crop.php?r=DGTWfpFtuytoLjsfAHK6MrrZ2Co-7AXKfbmrDV1u11aYkwg9gLyWGU9aI_iu0XS__sLQBmP2IM16XnyWPn0iF0spJy2kble-9hhGS0DIPdZFzuAuZ1UGg6_p4WNW5PJLkg8AfHh9Tj6TFaWP',
            time: '1:47PM',
            img: 'https://i.redd.it/nhmjprlqm0b21.png',
            message: 'Yoyo guys hows it going! Gonna start streaming in about an hour, in the meantime checkout this awesome pic of Jibril from NGNL!',
        },
    ],
    showGames: false,
    showFeed: true,
}

export const DashReducer = (initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...initialState,
                feed: action.payload,
            }
        case SET_FEED_DISPLAY:
            return {
                ...initialState,
                showFeed: true,
                showGames: false,
            }
        case SET_GAMES_DISPLAY:
            return {
                ...initialState,
                showFeed: false,
                showGames: true,
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
