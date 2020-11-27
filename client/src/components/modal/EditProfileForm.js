import React, { useState } from 'react'
import { style } from '../../css/CustomStyling'
import { useProfileDispatch, editProfile } from '../../pages/profile/context'
import { useAuthDispatch, useAuthState, reloadUser } from '../../pages/authentication/context'

export const EditProfileForm = () => {
    const profileDispatch = useProfileDispatch()
    const authDispatch = useAuthDispatch()
    const { user } = useAuthState()

    const [profile, setProfile] = useState({
        name: '',
        profilePicture: '',
        background: '',
        banner: '',
    })

    const { name, profilePicture, background, banner } = profile

    const onChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        editProfile(profileDispatch, profile)
        setTimeout(function task() {
            reloadUser(authDispatch, user._id)
        }, 1000)

        setProfile({
            name: '',
            profilePicture: '',
            background: '',
            banner: '',
        })
        //window.location.reload(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 style={{ color: `${style.primaryHeader}` }}>Edit Profile</h2>
            <input type='text' placeholder='UserName' name='name' value={name} onChange={onChange} />
            <input type='url' placeholder='Profile Picture' name='profilePicture' value={profilePicture} onChange={onChange} />
            <input type='url' placeholder='Background' name='background' value={background} onChange={onChange} />
            <input type='url' placeholder='Banner' name='banner' value={banner} onChange={onChange} />
            <div>
                <input className='GeneralHeaders globalbutton' type='submit' value='Save Changes' />
            </div>
        </form>
    )
}
