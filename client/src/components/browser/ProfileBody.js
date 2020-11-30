import React from 'react'

export const ProfileBody = () => {
    return (
        <>
            <div className='profile-Body-Center'>
                <h1
                    className='globalHeader Border-Bottom-1PX Primary-Header'
                    style={{
                        background: 'rgb(0,0,0,.8)',
                        textAlign: 'center',
                        height: '50',
                    }}
                >
                    Recent Activity
                </h1>
                <ul className='profile-Achievementslist'>
                    <li
                        style={{
                            backgroundImage: `url('https://i.pinimg.com/originals/f6/5a/57/f65a578cbfe3a0526b80b8a21254a984.jpg')`,
                        }}
                    >
                        <h2
                            className='globalHeader Border-Top-1PX Primary-Header'
                            style={{
                                marginTop: '70px',
                                backgroundColor: 'rgb(0,0,0,.9)',
                            }}
                        >
                            Legendary
                        </h2>
                    </li>
                    <li
                        style={{
                            backgroundImage: `url('https://i.pinimg.com/originals/f6/5a/57/f65a578cbfe3a0526b80b8a21254a984.jpg')`,
                        }}
                    >
                        <h2
                            className='globalHeader Border-Top-1PX Primary-Header'
                            style={{
                                marginTop: '70px',
                                backgroundColor: 'rgb(0,0,0,.9)',
                            }}
                        >
                            Head Hunter
                        </h2>
                    </li>
                    <li
                        style={{
                            backgroundImage: `url('https://cdn.survivetheark.com/uploads/monthly_2017_07/ark.jpg.eb6143cfedcd05eda8126deef02b7385.jpg')`,
                        }}
                    >
                        <h2
                            className='globalHeader Border-Top-1PX Primary-Header'
                            style={{
                                marginTop: '70px',
                                backgroundColor: 'rgb(0,0,0,.9)',
                            }}
                        >
                            Rex Master
                        </h2>
                    </li>
                    <li
                        style={{
                            backgroundImage: `url('https://i.redd.it/vjw22nfxlns11.jpg')`,
                        }}
                    >
                        <h2
                            className='globalHeader Border-Top-1PX Primary-Header'
                            style={{
                                marginTop: '70px',
                                backgroundColor: 'rgb(0,0,0,.9)',
                            }}
                        >
                            Portal Jumper
                        </h2>
                    </li>
                    <li
                        style={{
                            backgroundImage: `url('https://steam.cryotank.net/wp-content/gallery/monsterhunterworld/Monster-Hunter-World-01-HD.png')`,
                        }}
                    >
                        <h2
                            className='globalHeader Border-Top-1PX Primary-Header'
                            style={{
                                marginTop: '70px',
                                backgroundColor: 'rgb(0,0,0,.9)',
                            }}
                        >
                            Monster Slayer
                        </h2>
                    </li>
                    <li
                        style={{
                            backgroundImage: `url('https://savegameonline.com/wp-content/uploads/2013/02/witcher-3-banner-1.png')`,
                        }}
                    >
                        <h2
                            className='globalHeader Border-Top-1PX Primary-Header'
                            style={{
                                marginTop: '70px',
                                backgroundColor: 'rgb(0,0,0,.9)',
                            }}
                        >
                            Brewer
                        </h2>
                    </li>
                    <li
                        style={{
                            backgroundImage: `url('https://www.f-covers.com/cover/another-skyrim-facebook-cover-timeline-banner-for-fb.jpg')`,
                        }}
                    >
                        <h2
                            className='globalHeader Border-Top-1PX Primary-Header'
                            style={{
                                marginTop: '70px',
                                backgroundColor: 'rgb(0,0,0,.9)',
                            }}
                        >
                            World Eater Down
                        </h2>
                    </li>
                    <li
                        style={{
                            backgroundImage: `url('https://www.f-covers.com/cover/another-skyrim-facebook-cover-timeline-banner-for-fb.jpg')`,
                        }}
                    >
                        <h2
                            className='globalHeader Border-Top-1PX Primary-Header'
                            style={{
                                marginTop: '70px',
                                backgroundColor: 'rgb(0,0,0,.9)',
                            }}
                        >
                            Sweet Roll Master
                        </h2>
                    </li>
                </ul>
                <div className='profile-Comments'>
                    <h1
                        className='globalHeader Border-Top-1PX Primary-Header'
                        style={{
                            background: 'rgb(0,0,0,.8)',
                        }}
                    >
                        Profile Comments
                    </h1>
                    <ul>
                        <li>
                            <p className='globalHeaderL Tertiary-Header'>C:/{'>'} Load NPC Comment.exe</p>
                            <h5 className='globalHeaderL Primary-Header'>
                                User: <span className='Secondary-Header'>BabyJesus</span>
                            </h5>
                        </li>
                        <li>
                            <p className='globalHeaderL Tertiary-Header'>The Lord Of Dota</p>
                            <h5 className='globalHeaderL Primary-Header'>
                                User: <span className='Secondary-Header'>Rejis</span>
                            </h5>
                        </li>
                        <li>
                            <p className='globalHeaderL Tertiary-Header'>Have a nice afternoon friend</p>
                            <h5 className='globalHeaderL Primary-Header'>
                                User: <span className='Secondary-Header'>Parathax</span>
                            </h5>
                        </li>
                        <li>
                            <p className='globalHeaderL Tertiary-Header'>+rep prooooo skilllsssssss</p>
                            <h5 className='globalHeaderL Primary-Header'>
                                User: <span className='Secondary-Header'>Flipster</span>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
