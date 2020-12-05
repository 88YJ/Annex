import React from 'react'
import { useProfileState } from '../../pages/profile/context'

export const ProfileScreenShots = () => {
    const { CurrentProfile } = useProfileState()
    return (
        <>
            <div className='profile-Screenshots-Background'>
                <ul style={{ margin: '0', padding: '0' }}>
                    {CurrentProfile.screenShots.map((item, index) => (
                        <li className='profile-Screenshots' key={index}>
                            <img src={item} alt='' />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
