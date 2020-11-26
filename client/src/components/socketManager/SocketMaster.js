import React, { useEffect } from 'react'
import { useAuthState } from '../../pages/authentication/context'
import { useProfileDispatch, useProfileState, getFriends } from '../../pages/profile/context'
import { useServerState, useServerDispatch, loadServerChannelList, loadServerUserList } from '../../pages/server/context'
import { useMessageDispatch, loadInbox } from '../messages/context'
import { useSocketState, useSocketDispatch } from '../socketManager'
import { connectSocket } from '../socketManager/socketActions'

export const SocketMaster = () => {
    const { user } = useAuthState()
    const profileDispatch = useProfileDispatch()
    const { CurrentProfile } = useProfileState()
    const serverDispatch = useServerDispatch()
    const { currentServer } = useServerState()
    const socketDispatch = useSocketDispatch()
    const { socket } = useSocketState()
    const messageDispatch = useMessageDispatch()

    useEffect(() => {
        if (!socket && user) {
            connectSocket(socketDispatch)
        }
    }, [socket, socketDispatch, user])

    useEffect(() => {
        if (socket && user) {
            socket.on('userIdRequest', async () => {
                socket.emit('returnId', user._id, user.friendList)
            })
            socket.on('FriendUpdate', async (data) => {
                getFriends(profileDispatch)
            })
        }
    }, [socket, user, profileDispatch])

    useEffect(() => {
        if (currentServer) {
            socket.on('ServerUpdate', async (data) => {
                if (data._id === currentServer._id) {
                    loadServerChannelList(serverDispatch, data)
                    console.log(currentServer._id + data)
                }
            })
        }
    }, [serverDispatch, currentServer, socket])

    useEffect(() => {
        if (currentServer) {
            socket.on('voice-chat:user-joined-chat', async (data) => {
                if (data._id === currentServer._id) {
                    loadServerChannelList(serverDispatch, data)
                    console.log(currentServer._id + data)
                }
            })
        }
    }, [serverDispatch, currentServer, socket])

    useEffect(() => {
        if (currentServer) {
            socket.on('ServerUserUpdate', async (data) => {
                if (data === currentServer._id) {
                    loadServerUserList(serverDispatch, currentServer)
                    console.log('serverupdate')
                }
            })
        }
    }, [serverDispatch, currentServer, socket])

    useEffect(() => {
        if (currentServer) {
            socket.on('update:ChannelInfo', async (data) => {
                if (data === currentServer._id) {
                    loadServerChannelList(serverDispatch, currentServer)
                    console.log('serverupdate')
                }
            })
        }
    }, [serverDispatch, currentServer, socket])

    useEffect(() => {
        if (socket) {
            socket.on('stillLogged', async () => {
                socket.emit('respondLogged', user._id)
            })
        }
    }, [socket, user])

    useEffect(() => {
        if (CurrentProfile) {
            socket.on('update:inbox', async (userID, data) => {
                if (userID === CurrentProfile._id) {
                    socket.emit('return-update:read', data, user._id)
                } else {
                    loadInbox(messageDispatch, user._id)
                    console.log('inbox update')
                }
            })
            socket.on('update:inbox-change-in-database', async () => {
                loadInbox(messageDispatch, user._id)
            })
        }
    }, [socket, user, CurrentProfile])

    return null
}
