import React from 'react'

export const ProfileStats = () => {
    return (
        <>
            <div className='profile-Stats'>
                <ul>
                    <li>
                        <div
                            className='stats-GameImg'
                            style={{
                                backgroundImage:
                                    'url(https://www.callofduty.com/content/dam/atvi/activision/atvi-touchui/blog/callofduty/feature/BO-Cold-War-Reveal-Tout.jpg)',
                            }}
                        />
                        <h3 className='globalHeaderL Primary-Header' style={{ width: '250px', height: 'auto' }}>
                            Call Of Duty: Cold War <br />
                            Hours Played: 500
                        </h3>
                        <div style={{ width: 'auto', marginLeft: '20px' }}>
                            <h6 className='globalHeaderL Primary-Header'> KDA: 3.17</h6>
                            <h6 className='globalHeaderL Primary-Header'> Kills: 3765</h6>
                            <h6 className='globalHeaderL Primary-Header'> Assists: 1265</h6>
                            <h6 className='globalHeaderL Primary-Header'> Kill Streaks Called: 1257</h6>
                            <h6 className='globalHeaderL Primary-Header'> Zombies Killed: 21569</h6>
                        </div>
                    </li>
                    <li>
                        <div
                            className='stats-GameImg'
                            style={{
                                backgroundImage: 'url(https://image.api.playstation.com/vulcan/img/rnd/202010/2320/i5l1jLAhFSTiO7lSCNDWjJ2J.jpg)',
                            }}
                        />
                        <h3 className='globalHeaderL Primary-Header' style={{ width: '250px', height: 'auto' }}>
                            Call Of Duty: Modern Warfare
                            <br />
                            Hours Played: 250
                        </h3>
                        <div style={{ width: 'auto', marginLeft: '20px' }}>
                            <h6 className='globalHeaderL Primary-Header'> KDA: 4.20</h6>
                            <h6 className='globalHeaderL Primary-Header'> Kills: 2579</h6>
                            <h6 className='globalHeaderL Primary-Header'> Assists: 865</h6>
                            <h6 className='globalHeaderL Primary-Header'> Kill Streaks Called: 956</h6>
                        </div>
                    </li>
                    <li>
                        <div
                            className='stats-GameImg'
                            style={{
                                backgroundImage: 'url(https://venturebeat.com/wp-content/uploads/2014/01/gta-v-big.jpg?w=1200&strip=all)',
                            }}
                        />
                        <h3 className='globalHeaderL Primary-Header' style={{ width: '250px', height: 'auto' }}>
                            GTA V<br />
                            Hours Played: 5000
                        </h3>
                        <div style={{ width: 'auto', marginLeft: '20px' }}>
                            <h6 className='globalHeaderL Primary-Header'> Cars Stolen: 5325</h6>
                            <h6 className='globalHeaderL Primary-Header'> Kills: 3765</h6>
                            <h6 className='globalHeaderL Primary-Header'> Money: 8986585</h6>
                        </div>
                    </li>
                    <li>
                        <div
                            className='stats-GameImg'
                            style={{
                                backgroundImage:
                                    'url(https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2019/08/witcher-3-box-art.jpg)',
                            }}
                        />
                        <h3 className='globalHeaderL Primary-Header' style={{ width: '250px', height: 'auto' }}>
                            The Witcher 3: Wild Hunt
                            <br />
                            Hours Played: 1238
                        </h3>
                        <div style={{ width: 'auto', marginLeft: '20px' }}>
                            <h6 className='globalHeaderL Primary-Header'> Griffins Killed: 53</h6>
                            <h6 className='globalHeaderL Primary-Header'> Distance Traveled: 900KM</h6>
                        </div>
                    </li>
                    <li>
                        <div
                            className='stats-GameImg'
                            style={{
                                backgroundImage: 'url(https://steamuserimages-a.akamaihd.net/ugc/961973556162807947/E206921DBE66771432BD7134D8BA82D9912BC468/)',
                            }}
                        />
                        <h3 className='globalHeaderL Primary-Header' style={{ width: '250px', height: 'auto' }}>
                            Divinity Original Sin: II
                            <br />
                            Hours Played: 3058
                        </h3>
                        <div style={{ width: 'auto', marginLeft: '20px' }}>
                            <h6 className='globalHeaderL Primary-Header'> Geo Spells Cast: 1200</h6>
                            <h6 className='globalHeaderL Primary-Header'> Damage Delt: 536000</h6>
                            <h6 className='globalHeaderL Primary-Header'> Gold Earned: 696969</h6>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}
