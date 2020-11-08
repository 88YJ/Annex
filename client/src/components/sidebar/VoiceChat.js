import React, { useEffect, useCallback, useRef } from "react";
import { useAuthState } from "../../pages/authentication/context";
import {
    useChatState,
    useChatDispatch,
    setSocket,
    setLocalStream,
    updateUserList
} from "../../pages/chat/context";
import { useServerState } from "../../pages/server/context";

let RTCConfig = {
    iceServers: [{ urls: 'stun:stun.services.mozilla.com' }, { urls: 'stun:stun.l.google.com:19302' }]
};
let peerConnections = [];

export const VoiceChat = () => {
    const { isLoggedIn, user } = useAuthState();
    const { socket, localStream, userList } = useChatState();
    const { currentChannel } = useServerState();

    const chatDispatch = useChatDispatch();

    const callUser = useCallback(async (data) => {
        console.log("Calling user: " + data.userId);

        const offer = await peerConnections[data.userId].createOffer();
        await peerConnections[data.userId].setLocalDescription(new RTCSessionDescription(offer));

        socket.emit("voice-chat:call", { offer, to: data.socketId, from: user._id });

    }, [socket, chatDispatch]);

    const answerCall = useCallback(async () => {
        socket.on("voice-chat:receiving-call", async (data) => {
            console.log("reciving call from: " + data.from)
            console.log(peerConnections);

            await peerConnections[data.from].setRemoteDescription(
                new RTCSessionDescription(data.offer)
            );

            const answer = await peerConnections[data.from].createAnswer();
            await peerConnections[data.from].setLocalDescription(new RTCSessionDescription(answer));
            socket.emit("voice-chat:answer-call", {
                answer,
                to: data.socket,
                from: user._id
            });
        });
    }, [socket, chatDispatch])

    const receiveAnswer = useCallback(async () => {
        socket.on("voice-chat:answer-recieved", async (data) => {

            //This is running twice, hence the if to stop
            if (!peerConnections[data.from].remoteDescription) {
                await peerConnections[data.from].setRemoteDescription(new RTCSessionDescription(data.answer))
                console.log("received an answer from:" + data.from)
            }
        })
    }, [socket, chatDispatch])

    useEffect(() => {
        if (isLoggedIn) {
            setSocket(chatDispatch);
        }
    }, [chatDispatch, isLoggedIn])

    //TODO: Make a check for if the channel is a voice channel
    useEffect(() => {
        if (userList && socket) {
            socket.on('voice-chat:remove-user', (socketId) => {
                //removeUserFromChat(chatDispatch, socket);
            })

            answerCall();
            receiveAnswer();
        }
    }, [socket, userList, callUser, answerCall, receiveAnswer, chatDispatch])

    useEffect(() => {
        userList.forEach(userInfo => {
            console.log(userInfo);
            if (!peerConnections[userInfo.userId]) {
                peerConnections[userInfo.userId] = new RTCPeerConnection(RTCConfig);
                localStream.getTracks().forEach(track => peerConnections[userInfo.userId].addTrack(track, localStream));

                peerConnections[userInfo.userId].ontrack = ({ streams: [stream] }) => {
                    const remote = document.getElementById('remote-video');
                    if (remote) {
                        remote.srcObject = stream;
                    }
                }

                callUser(userInfo);
            }
        });

    }, [userList, callUser])

    useEffect(() => {
        if (currentChannel && socket) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {

                setLocalStream(chatDispatch, stream);
                const local = document.getElementById('local-video');
                if (local) {
                    local.srcObject = stream;
                }

            }).then(() => {
                socket.emit('voice-chat:join', { channel: currentChannel._id, user: user._id })
            }).finally(() => {
                socket.on('voice-chat:update-users', (data) => {
                    socket.emit('voice-chat:update-new-user', { userId: user._id, socketId: socket.id, newUser: data.userId })
                    if (data.userId !== user._id) {
                        updateUserList(chatDispatch, data);
                    }
                })
            })
        }
    }, [socket, currentChannel, chatDispatch])

    let localVideo = <video autoPlay muted id="local-video" />
    let remoteVideo = <video autoPlay id="remote-video" />

    return <div>
        {localVideo}
        {remoteVideo}
    </div>
};
