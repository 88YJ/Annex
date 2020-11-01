import React, { useEffect, useCallback, useRef } from "react";
import { useAuthState } from "../../pages/authentication/context";
import {
    useChatState,
    useChatDispatch,
    setSocket,
    joinVoiceChat,
    updateUserList,
    updateRTCPeerConnection,
    setRemoteStream
} from "../../pages/chat/context";
import { useServerState } from "../../pages/server/context";

export const VoiceChat = () => {
    const { isLoggedIn } = useAuthState();
    const { socket, userList, rtcPeerConnection, localStream, remoteStream } = useChatState();
    const { currentChannel } = useServerState();

    const chatDispatch = useChatDispatch();

    const callUser = useCallback(async (socketId) => {
        console.log("Calling user: " + socketId);

        const peerConnection = rtcPeerConnection;
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

        updateRTCPeerConnection(chatDispatch, peerConnection)
        socket.emit("voice-chat:call", { offer, to: socketId });

    }, [socket, rtcPeerConnection, chatDispatch]);

    const answerCall = useCallback(async () => {
        socket.on("voice-chat:receiving-call", async (data) => {
            const peerConnection = rtcPeerConnection;

            await peerConnection.setRemoteDescription(
                new RTCSessionDescription(data.offer)
            );
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

            updateRTCPeerConnection(chatDispatch, peerConnection);

            socket.emit("voice-chat:answer-call", {
                answer,
                to: data.socket
            });
        });
    }, [socket, rtcPeerConnection, chatDispatch])

    const receiveAnswer = useCallback(async () => {
        socket.on("voice-chat:answer-recieved", async (data) => {
            const peerConnection = rtcPeerConnection;

            //This is running twice, hence the if to stop
            if (!peerConnection.remoteDescription) {
                console.log(peerConnection);
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))
                updateRTCPeerConnection(chatDispatch, peerConnection);
            }
        })

    }, [socket, rtcPeerConnection, chatDispatch])

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

            socket.on('voice-chat:update-users', (socketId) => {
                if (socketId !== socket.id) {
                    updateUserList(chatDispatch, socketId);
                    callUser(socketId);
                    console.log("User joined voice chat!");
                }
            })

            answerCall();
            receiveAnswer();
        }
    }, [socket, userList, callUser, answerCall, receiveAnswer, chatDispatch])

    useEffect(() => {
        const peerConnection = rtcPeerConnection;
        if (currentChannel && socket) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
                joinVoiceChat(chatDispatch, stream);

                stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            }).then(() => {
                socket.emit('voice-chat:join', currentChannel._id)
                updateRTCPeerConnection(chatDispatch, peerConnection)
            });
        }
    }, [socket, currentChannel, rtcPeerConnection, chatDispatch])

    useEffect(() => {
        rtcPeerConnection.ontrack = ({ streams: [stream] }) => {
            setRemoteStream(chatDispatch, stream);
        };
    }, [rtcPeerConnection, chatDispatch])

    useEffect(() => {
        if (localStream) {
            const local = document.getElementById('local-video');
            if (local) {
                local.srcObject = localStream;
            }
        }

        if (remoteStream) {
            const remote = document.getElementById('remote-video');
            if (remote) {
                remote.srcObject = remoteStream;
                console.log(remoteStream);
            }
        }
    }, [localStream, remoteStream])

    let localVideo = <video autoPlay muted id="local-video" />
    let remoteVideo = <video autoPlay id="remote-video" />

    return <div>
        {localVideo}
        {remoteVideo}
    </div>
}