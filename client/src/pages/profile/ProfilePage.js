import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Profile } from '../../components/browser/Profile'
import { useProfileState, useProfileDispatch, loadCurrentProfile } from '../../pages/profile/context'

export const ProfilePage = () => {
    const { ProfilesLoaded, Profiles, CurrentProfile } = useProfileState()
    const profileDispatch = useProfileDispatch()
    const { profile_id } = useParams()

    useEffect(() => {
        loadCurrentProfile(profileDispatch, profile_id)
    }, [ProfilesLoaded, profileDispatch, Profiles, profile_id])

    if (CurrentProfile) {
        return <Profile />
    }
    return null
}
