import React, { useCallback, useEffect } from 'react';
import { useSocketState } from '../../components/socketManager';
import { useAuthState } from '../../pages/authentication/context';
import { updateUserList, useChatDispatch, useChatState } from '../../pages/chat/context';
import { useServerState } from '../../pages/server/context';

let RTCConfig = {
    iceServers: [{ urls: 'stun:stun.services.mozilla.com' }, { urls: 'stun:stun.l.google.com:19302' }],
}
let peerConnections = []
let previousChannel
let localStream

export const VoiceChat = () => {
    const { user } = useAuthState()
    const { userList } = useChatState()
    const { currentVoiceChannel } = useServerState()
    const { socket } = useSocketState()
    const chatDispatch = useChatDispatch()

    const callUser = useCallback(
        async (userId) => {
            console.log('Calling user: ' + userId)

            const offer = await peerConnections[userId].createOffer()
            await peerConnections[userId].setLocalDescription(new RTCSessionDescription(offer))

            socket.emit('voice-chat:call', { offer, to: userId, from: user._id })
        },
        [socket, user]
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
    }, [socket, user])

    const receiveAnswer = useCallback(async () => {
        socket.on('voice-chat:answer-recieved', async (data) => {
            if (!peerConnections[data.from].remoteDescription && data.answer) {
                await peerConnections[data.from].setRemoteDescription(new RTCSessionDescription(data.answer))
                console.log('received an answer from:' + data.from)
            }
        })
    }, [socket])

    const handleRemoteStream = useCallback(async (stream, id) => {
        const remoteVideo = document.createElement('video')

        remoteVideo.id = id
        remoteVideo.autoplay = true
        remoteVideo.srcObject = stream

        let videoContainer = document.getElementById('video-container')
        videoContainer.appendChild(remoteVideo)
    }, [])

    const handleIceCandidate = useCallback(
        async (event, userId) => {
            if (event.candidate) {
                socket.emit('voice-chat:ice-candidate', { candidate: event.candidate, to: userId, from: user._id })
            }
        },
        [socket, user]
    )

    const handleLeaveChannel = useCallback(async () => {
        if (previousChannel) {
            peerConnections.forEach((peer) => peer.close())
            peerConnections = []

            localStream.getTracks().forEach((track) => track.stop())
            localStream = undefined

            let videoContainer = document.getElementById('video-container')
            while (videoContainer.firstChild) {
                videoContainer.removeChild(videoContainer.firstChild)
            }

            updateUserList(chatDispatch, [])

            socket.emit('voice-chat:leave', { channel: previousChannel._id, user: user })
            previousChannel = undefined
        }
    }, [chatDispatch, socket, user])

    useEffect(() => {
        userList.forEach((userId) => {
            console.log(userId)
            if (userId !== user._id) {
                if (!peerConnections[userId]) {
                    peerConnections[userId] = new RTCPeerConnection(RTCConfig)
                    localStream.getTracks().forEach((track) => peerConnections[userId].addTrack(track, localStream))

                    peerConnections[userId].ontrack = (event) => {
                        handleRemoteStream(event.streams[0], userId)
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
    }, [userList, callUser, receiveAnswer, handleIceCandidate, handleRemoteStream, socket, answerCall, user])

    useEffect(() => {
        if (currentVoiceChannel && socket) {
            //Check if we are joining from another channel
            handleLeaveChannel()

            previousChannel = currentVoiceChannel
            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    const local = document.getElementById('local-video')
                    if (local) {
                        local.srcObject = stream
                        localStream = stream
                    }
                })
                .then(() => {
                    socket.emit('voice-chat:join', { channel: currentVoiceChannel._id, user: user })
                })
        }
    }, [socket, currentVoiceChannel, handleLeaveChannel, chatDispatch, user])

    useEffect(() => {
        if (socket) {
            socket.on('voice-chat:update-users', (data) => {
                //We want to check if a user has left the voice chat.
                let dictionary = []

                //Map each user.
                data.forEach((user) => {
                    if (!dictionary[user]) {
                        dictionary[user] = 1
                    }
                })

                //If there is an user that is not in the dictionary then they have left the chat.
                userList.forEach((user) => {
                    if (!dictionary[user]) {
                        if (peerConnections[user]) {
                            peerConnections[user].close()
                            delete peerConnections[user]
                        }

                        let remoteStream = document.getElementById(user)
                        if (remoteStream) {
                            remoteStream.remove()
                        }
                    }
                })

                updateUserList(chatDispatch, data)
            })
        }
    }, [socket, chatDispatch, userList])

    let localVideo = <video hidden autoPlay muted id='local-video' />
    let remoteVideoContainer = <div hidden id='video-container'></div>

    return (
        <div>
            {localVideo}
            {remoteVideoContainer}
            {previousChannel ? (
                <button style={{ position: 'absolute', width: '251px', height: '30px', bottom: '0', left: '65px' }} onClick={handleLeaveChannel}>
                    Leave Chat
                </button>
            ) : null}
        </div>
    )
}
