import React, { useEffect, useCallback } from 'react'
import { useAuthState } from '../../pages/authentication/context'
import { useChatState, useChatDispatch, setLocalStream, updateUserList } from '../../pages/chat/context'
import { useServerState } from '../../pages/server/context'
import { useSocketState } from '../../components/socketManager'

let RTCConfig = {
    iceServers: [{ urls: 'stun:stun.services.mozilla.com' }, { urls: 'stun:stun.l.google.com:19302' }],
}
let peerConnections = []

export const VoiceChat = () => {
    const { user } = useAuthState()
    const { localStream, userList } = useChatState()
    const { currentChannel } = useServerState()
    const { socket } = useSocketState()
    const chatDispatch = useChatDispatch()

    const callUser = useCallback(
        async (userId) => {
            console.log('Calling user: ' + userId)

            const offer = await peerConnections[userId].createOffer()
            await peerConnections[userId].setLocalDescription(new RTCSessionDescription(offer))

            socket.emit('voice-chat:call', { offer, to: userId, from: user._id })
        },
        [socket, user._id]
    )

    const answerCall = useCallback(async () => {
        socket.on('voice-chat:receiving-call', async (data) => {
            console.log('reciving call from: ' + data.from)

            if (!peerConnections[data.from].remoteDescription) {
                await peerConnections[data.from].setRemoteDescription(new RTCSessionDescription(data.offer))
            }

            let answer
            if (!peerConnections[data.from].localDescription) {
                answer = await peerConnections[data.from].createAnswer()
                await peerConnections[data.from].setLocalDescription(new RTCSessionDescription(answer))
            }

            socket.emit('voice-chat:answer-call', {
                answer,
                to: data.from,
                from: user._id,
            })
        })
    }, [socket, user._id])

    const receiveAnswer = useCallback(async () => {
        socket.on('voice-chat:answer-recieved', async (data) => {
            if (!peerConnections[data.from].remoteDescription && data.answer) {
                await peerConnections[data.from].setRemoteDescription(new RTCSessionDescription(data.answer))
                console.log('received an answer from:' + data.from)
            }
        })
    }, [socket])

    useEffect(() => {
        userList.forEach((userId) => {
            if (userId !== user._id) {
                if (!peerConnections[userId]) {
                    peerConnections[userId] = new RTCPeerConnection(RTCConfig)
                    localStream.getTracks().forEach((track) => peerConnections[userId].addTrack(track, localStream))

                    peerConnections[userId].ontrack = (event) => {
                        handleRemoteStream(event.streams[0])
                    }

                    peerConnections[userId].onicecandidate = (event) => {
                        handleIceCandidate(event, userId)
                    }

                    if (userList[userList.length - 1] !== user._id) {
                        callUser(userId)
                    }

                    answerCall()
                    receiveAnswer()

                    socket.on('voice-chat:incoming-candidate', (data) => {
                        console.log(data)
                        peerConnections[data.from].addIceCandidate(data.candidate)
                    })
                }
            }
        })
    }, [userList, callUser, localStream, receiveAnswer, socket, user._id, answerCall])

    useEffect(() => {
        if (currentChannel && socket) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setLocalStream(chatDispatch, stream)
                    const local = document.getElementById('local-video')
                    if (local) {
                        local.srcObject = stream
                    }
                })
                .then(() => {
                    socket.emit('voice-chat:join', { channel: currentChannel._id, user: user._id })
                })
        }
    }, [socket, currentChannel, chatDispatch, user._id])

    useEffect(() => {
        if (socket) {
            socket.on('voice-chat:update-users', (data) => {
                console.log(data)
                updateUserList(chatDispatch, data)
            })
        }
    }, [socket, chatDispatch])

    const handleRemoteStream = (stream) => {
        const remoteVideo = document.createElement('video')
        remoteVideo.autoplay = true
        remoteVideo.srcObject = stream

        let videoContainer = document.getElementById('video-container')
        videoContainer.appendChild(remoteVideo)
    }

    const handleIceCandidate = (event, userId) => {
        if (event.candidate) {
            socket.emit('voice-chat:ice-candidate', { candidate: event.candidate, to: userId, from: user._id })
        }
    }

    let localVideo = <video autoPlay muted id='local-video' />
    let remoteVideoContainer = <div id='video-container'></div>

    return (
        <div>
            {localVideo}
            {remoteVideoContainer}
        </div>
    )
}
