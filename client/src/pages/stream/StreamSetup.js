import React, { useEffect, useRef } from 'react'

function StreamSetup(options) {
    const divEl = useRef(null)
    const videoEl = useRef(null)

    useEffect(() => {
        const script = document.createElement('script')

        script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js'
        script.async = true

        document.body.appendChild(script)

        script.onload = () => {
            // eslint-disable-next-line no-undef
            if (IVSPlayer.isPlayerSupported) {
                // eslint-disable-next-line no-undef
                const player = IVSPlayer.create()
                player.attachHTMLVideoElement(document.getElementById('video-player'))
                //player.load('https://606fb87513f1.us-west-2.playback.live-video.net/api/video/v1/us-west-2.304074195227.channel.MWthyDciPjUY.m3u8');
                player.play()
            }
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div ref={divEl} style={{ height: 'auto', width: 'auto', paddingBottom: '0', margin: '0' }}>
            <video id='video-player' ref={videoEl} playsInline autoPlay style={{ width: '100%', height: 'auto' }} controls />
        </div>
    )
}

export default StreamSetup
