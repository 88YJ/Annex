import React, { useState } from 'react'
import { useProfileState, useProfileDispatch, sendComment } from '../../pages/profile/context'
import { useAuthState } from '../../pages/authentication/context'

export const ProfileComments = () => {
    const { CurrentProfile } = useProfileState()
    const profileDispatch = useProfileDispatch()

    const { user } = useAuthState()

    const [comment, setComment] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        const commentData = {
            _id: user._id,
            name: user.name,
            text: comment,
        }

        sendComment(profileDispatch, CurrentProfile._id, commentData)
        setComment('')
    }

    return (
        <>
            <div className='profile-Comments'>
                <h1
                    className='globalHeader Border-Top-1PX Primary-Header'
                    style={{
                        background: 'rgb(0,0,0,.8)',
                    }}
                >
                    Comments
                </h1>
                <form onSubmit={onSubmit} style={{ height: 'auto' }}>
                    <input
                        type='text'
                        placeholder='Leave a comment'
                        style={{ height: 'auto', width: '99.3%' }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </form>
                <ul>
                    {CurrentProfile.profileComments
                        ? CurrentProfile.profileComments.map((item, index) => (
                              <li key={index}>
                                  <p className='globalHeaderL Tertiary-Header'>{item.text}</p>
                                  <h5 className='globalHeaderL Primary-Header'>
                                      User: <span className='Secondary-Header'> {item.name}</span>
                                  </h5>
                              </li>
                          ))
                        : null}
                </ul>
            </div>
        </>
    )
}
