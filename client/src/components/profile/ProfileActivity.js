import React from 'react'
import { useProfileState } from '../../pages/profile/context'

export const ProfileActivity = () => {
    const { CurrentProfile } = useProfileState()

    return (
        <>
            <div className='profile-Activity'>
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
                <ul className='profile-Activity-Log'>
                    <li>
                        <h3 className='Primary-Header' style={{ height: 'auto', width: 'auto' }}>
                            Halo:
                        </h3>
                        <p className='Secondary-Header' style={{ marginLeft: '5px', marginTop: '2px' }}>
                            {CurrentProfile.name}: Completed Halo on legendary!
                        </p>
                    </li>
                    <li>
                        <h3 className='Primary-Header' style={{ height: 'auto', width: 'auto' }}>
                            Halo:
                        </h3>
                        <p className='Secondary-Header' style={{ marginLeft: '5px', marginTop: '2px' }}>
                            {CurrentProfile.name}: Landed 100 headshots!
                        </p>
                    </li>
                    <li>
                        <h3 className='Primary-Header' style={{ height: 'auto', width: 'auto' }}>
                            Ark Survival Evolved:
                        </h3>
                        <p className='Secondary-Header' style={{ marginLeft: '5px', marginTop: '2px' }}>
                            {CurrentProfile.name}: Tamed their first rex!
                        </p>
                    </li>
                    <li>
                        <h3 className='Primary-Header' style={{ height: 'auto', width: 'auto' }}>
                            Portal:
                        </h3>
                        <p className='Secondary-Header' style={{ marginLeft: '5px', marginTop: '2px' }}>
                            {CurrentProfile.name}: Jumped through 50 portals!
                        </p>
                    </li>
                    <li>
                        <h3 className='Primary-Header' style={{ height: 'auto', width: 'auto' }}>
                            Monster Hunter: World:
                        </h3>
                        <p className='Secondary-Header' style={{ marginLeft: '5px', marginTop: '2px' }}>
                            {CurrentProfile.name}: Executed their 50th monster!
                        </p>
                    </li>
                    <li>
                        <h3 className='Primary-Header' style={{ height: 'auto', width: 'auto' }}>
                            The Witcher: Wild Hunt:
                        </h3>
                        <p className='Secondary-Header' style={{ marginLeft: '5px', marginTop: '2px' }}>
                            {CurrentProfile.name}: Brewed their 15th potion!
                        </p>
                    </li>
                </ul>
            </div>
        </>
    )
}
