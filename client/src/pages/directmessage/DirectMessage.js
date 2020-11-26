import React, { useEffect } from 'react'
import { Messenger } from './Messenger'
import { useParams } from 'react-router'
import { useProfileDispatch, loadCurrentProfile } from '../profile/context'

export const DirectMessage = () => {
    const { profile_id } = useParams()
    const profileDispatch = useProfileDispatch()

    useEffect(() => {
        loadCurrentProfile(profileDispatch, profile_id)
    }, [profile_id, profileDispatch])

    return <Messenger />
}
