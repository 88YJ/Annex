import React, { useEffect } from 'react'
import { Messenger } from './Messenger'
import { useParams } from 'react-router'
import { useProfileState, useProfileDispatch, loadCurrentProfile } from '../profile/context'

export const DirectMessage = () => {
    const { profile_id } = useParams()
    const { FriendsLoaded, Friends } = useProfileState()
    const profileDispatch = useProfileDispatch()

    useEffect(() => {
        if (FriendsLoaded) {
            let user = Friends.filter((friend) => friend._id === profile_id)

            if (user.length === 0) {
                loadCurrentProfile(profileDispatch, profile_id)
            } else {
                loadCurrentProfile(profileDispatch, profile_id)
            }
        }
    }, [FriendsLoaded, Friends, profile_id, profileDispatch])

    return <Messenger />
}
