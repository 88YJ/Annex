import React, { useEffect, useRef } from 'react'

function StreamSetup(options) {
    let player
    const divEl = useRef(null)
    const videoEl = useRef(null)

    function reload() {
        if (!player.core.isLoaded) {
            player.load('https://606fb87513f1.us-west-2.playback.live-video.net/api/video/v1/us-west-2.304074195227.channel.3iTUm3s8X0vz.m3u8')
            console.log('reload player' + player.core.isLoaded)
            setTimeout(() => {
                reload()
            }, 5000)
        } else {
            console.log('start player' + player.core.isLoaded)
            player.play()
            return
        }
    }

    useEffect(() => {
        const script = document.createElement('script')

        script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js'
        script.async = true

        document.body.appendChild(script)

        script.onload = () => {
            // eslint-disable-next-line no-undef
            if (IVSPlayer.isPlayerSupported) {
                // eslint-disable-next-line no-undef
                player = IVSPlayer.create()
                player.attachHTMLVideoElement(document.getElementById('video-player'))
                player.load('https://606fb87513f1.us-west-2.playback.live-video.net/api/video/v1/us-west-2.304074195227.channel.3iTUm3s8X0vz.m3u8')
                //console.log(player)
                if (player.core.isLoaded) {
                    player.play()
                } else {
                    //reload()
                }
            }
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [player])

    return (
        <div ref={divEl} style={{ height: 'auto', width: 'auto', paddingBottom: '0', margin: '0' }}>
            <video id='video-player' ref={videoEl} playsInline autoPlay style={{ width: '100%', height: 'auto' }} controls />
        </div>
    )
}

export default StreamSetup
