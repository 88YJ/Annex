import React, { useState } from 'react'
import { useAuthState } from '../../pages/authentication/context'
import DefaultProfilePicture from '../../images/DefaultProfile.png'
import { Posts } from './Posts'
import { FeedSidebars } from './FeedSidebars'
import { useDashDispatch, sendPosts } from '../../pages/dashboard/context'

import VideocamIcon from '@material-ui/icons/VideocamOutlined'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibraryOutlined'
import IntsertEmoticonIcon from '@material-ui/icons/InsertEmoticonOutlined'

export const Feed = () => {
    const { user } = useAuthState()
    const dashDispatch = useDashDispatch()

    const [imageBoolean, setImage] = useState({
        sendImage: false,
    })

    const { sendImage } = imageBoolean

    const [messageContainer, setMessage] = useState({
        message: '',
        img: '',
    })

    const { message, img } = messageContainer

    const onChange = (e) => setMessage({ ...messageContainer, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        let payload = { name: user.name, profilePicture: user.profilePicture, message: message, img: img }
        try {
            await sendPosts(dashDispatch, payload)
            setMessage({
                message: '',
                img: '',
            })
            setImage({ sendImage: false })
            console.log('send')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='feed-Container'>
                <FeedSidebars />
                <div className='feed'>
                    {user !== undefined ? (
                        <div className='post-To-Feed'>
                            <div className='post-To-Feed-Top'>
                                <div
                                    className='NavIcons'
                                    style={
                                        user.profilePicture
                                            ? { backgroundImage: `url(${user.profilePicture})` }
                                            : { backgroundImage: `url(${DefaultProfilePicture})` }
                                    }
                                />
                                <input
                                    onSubmit={onSubmit}
                                    name='message'
                                    value={message}
                                    onChange={onChange}
                                    onKeyPress={(event) => (event.key === 'Enter' ? onSubmit(event) : null)}
                                    placeholder={`Post as ${user.name}!`}
                                />
                            </div>

                            <div className='post-To-Feed-Bottom'>
                                <div className='post-To-Feed-Bottom-Options'>
                                    <VideocamIcon />
                                    <p>Live Steam</p>
                                </div>
                                <div className='post-To-Feed-Bottom-Options' onClick={() => setImage({ sendImage: true })}>
                                    <PhotoLibraryIcon />
                                    <p>Photo/Video</p>
                                </div>
                                <div className='post-To-Feed-Bottom-Options'>
                                    <IntsertEmoticonIcon />
                                    <p>Reacting</p>
                                </div>
                            </div>
                            {sendImage ? (
                                <>
                                    <input
                                        className='post-To-Feed-Image-Input'
                                        onSubmit={onSubmit}
                                        name='img'
                                        value={img}
                                        onChange={onChange}
                                        onKeyPress={(event) => (event.key === 'Enter' ? onSubmit(event) : null)}
                                        placeholder={`Post a cool picture!`}
                                    />
                                    {img !== '' ? <img src={img} alt='' /> : null}
                                </>
                            ) : null}
                        </div>
                    ) : null}
                    <Posts />
                </div>
                <div>
                    <div style={{ marginLeft: '29%', width: '70%', height: 'auto' }}>
                        <p style={{ padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.5)', marginBottom: '15px' }}>Plays Of the Week</p>
                        <iframe
                            title='1'
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/ohK-sKlDN1s'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        ></iframe>
                        <iframe
                            title='2'
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/Wd8stn7UWeA'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        ></iframe>
                        <iframe
                            title='3'
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/nbLp1TmGb7w'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        ></iframe>
                        <iframe
                            title='4'
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/fOptpokjOZI'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}
