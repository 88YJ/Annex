import { useEffect } from 'react'
import { useAuthState } from '../../pages/authentication/context'
import { useProfileDispatch, useProfileState, getFriends } from '../../pages/profile/context'
import { useServerState, useServerDispatch, loadServerChannelList, loadServerUserList, loadCurrentServer } from '../../pages/server/context'
import { useMessageDispatch, loadInbox } from '../messages/context'
import { useSocketState, useSocketDispatch } from '../socketManager'
import { connectSocket } from '../socketManager/socketActions'

export const SocketMaster = () => {
    const { user } = useAuthState()
    const profileDispatch = useProfileDispatch()
    const { CurrentProfile } = useProfileState()
    const serverDispatch = useServerDispatch()
    const { currentServer, currentServerID } = useServerState()
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
        if (currentServerID) {
            socket.on('ServerUpdate', async (data) => {
                if (data === currentServerID) {
                    loadCurrentServer(serverDispatch, currentServerID)
                    console.log('ServerUpdate')
                }
            })
        }
    }, [serverDispatch, currentServerID, socket])

    useEffect(() => {
        if (currentServerID) {
            socket.on('voice-chat:user-joined-chat', async (data) => {
                if (data._id === currentServerID) {
                    loadServerChannelList(serverDispatch, data)
                    console.log(currentServerID + data)
                }
            })
        }
    }, [serverDispatch, currentServerID, socket])

    useEffect(() => {
        if (currentServerID) {
            socket.on('ServerUserUpdate', async (data) => {
                if (data === currentServerID) {
                    loadServerUserList(serverDispatch, currentServerID)
                    console.log('ServerUserUpdate')
                }
            })
        }
    }, [serverDispatch, currentServerID, socket])

    useEffect(() => {
        if (currentServerID) {
            socket.on('update:ChannelInfo', async (data) => {
                if (data === currentServerID) {
                    loadServerChannelList(serverDispatch, currentServer)
                    console.log('update:ChannelInfo')
                }
            })
        }
        // eslint-disable-next-line
    }, [serverDispatch, currentServerID, socket])

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
    }, [socket, user, CurrentProfile, messageDispatch])

    return null
}
