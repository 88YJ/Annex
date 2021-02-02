import React, { useEffect } from 'react'
import { useDashState, useDashDispatch, getPosts } from '../../pages/dashboard/context'
import DefaultProfilePicture from '../../images/DefaultProfile.png'

import ThumbUp from '@material-ui/icons/ThumbUpOutlined'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeIcon from '@material-ui/icons/NearMeOutlined'

export const Posts = () => {
    const { feed } = useDashState()
    const dashDispatch = useDashDispatch()

    useEffect(() => {
        getPosts(dashDispatch)
    }, [dashDispatch])
    return (
        <>
            {feed.map((post, i) => (
                <div className='post' key={i}>
                    <div className='post_top'>
                        <div
                            className='NavIcons post_avatar'
                            style={
                                post.profilePicture ? { backgroundImage: `url(${post.profilePicture})` } : { backgroundImage: `url(${DefaultProfilePicture})` }
                            }
                        />
                        <div className='post_topInfo'>
                            <h3>{post.name}</h3>
                            <p>{post.time}</p>
                        </div>
                    </div>

                    {post.message ? (
                        <div className='post_bottom'>
                            <p>{post.message}</p>
                        </div>
                    ) : null}

                    {post.img ? (
                        <div className='post_image'>
                            <img src={post.img} alt='' />
                        </div>
                    ) : null}

                    <div className='post_options'>
                        <div className='post_option'>
                            <ThumbUp />
                            <p>Like</p>
                        </div>
                        <div className='post_option'>
                            <ChatBubbleOutlineIcon />
                            <p>Comment</p>
                        </div>
                        <div className='post_option'>
                            <NearMeIcon />
                            <p>Share</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
