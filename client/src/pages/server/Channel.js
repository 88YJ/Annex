import React, { useEffect } from 'react';
import { CHANNEL_MESSAGES } from '../../components/messages/context/types';
import { Message } from '../../components/messages/Message';
import { useMessageDispatch, useMessageState, setMessage, updateChannelMessages, clearChannelMessages } from '../../components/messages/context';
import { useSocketState } from '../../components/socketManager';
import { useAuthState } from '../../pages/authentication/context';
import { useServerState } from './context';

export const Channel = () => {
  const messageDispatch = useMessageDispatch();
  const { message } = useMessageState();
  const { currentServer, currentTextChannel } = useServerState();
  const { socket } = useSocketState();
  const { user } = useAuthState();

  useEffect(() => {
    if (socket && currentTextChannel) {
      leaveConnection();
      socket.emit('joinChat', currentTextChannel._id);
      clearChannelMessages(messageDispatch);
    }

    async function leaveConnection() {
      socket.emit('leaveChat', currentTextChannel._id);
      socket.removeAllListeners('recievedMessage');
    }
  }, [socket, currentTextChannel, messageDispatch]);

  useEffect(() => {
    if (socket && currentTextChannel) {
      socket.on('recievedMessage', (messageContent) => {
        updateChannelMessages(messageDispatch, messageContent);
      });
    }
  }, [socket, currentTextChannel, messageDispatch]);

  const sendMessage = (event) => {
    event.preventDefault();

    let messageContent = {
      userId: user._id,
      name: user.name,
      profilepicture: user.profilePicture,
      text: message,
    };

    setMessage(messageDispatch, '');

    socket.emit(currentTextChannel._id + 'sentMessage', messageContent);
  };

  if (currentServer) {
    if (!currentTextChannel) {
      return (
        <div className='server-Landingpageimg' style={{ backgroundImage: `url(${currentServer.img})` }}>
          <div>
            <h1 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}>
              {currentServer.name}
            </h1>
          </div>
          <div>
            <div>
              <div>
                <h2 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}>
                  Welcome To the Server!!
                </h2>{' '}
                <br />{' '}
                <h2 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}>
                  Please take a look at our rules!
                </h2>
              </div>
            </div>
          </div>
          <div className='globalHeader'></div>
        </div>
      );
    } else
      return (
        <div className='channelPage' style={{ backgroundImage: `url(${currentTextChannel.customization.icon})` }}>
          <div>
            <div className='chat-Channelname'>
              <h2 className='globalHeader' style={{ color: 'red', backgroundColor: 'black', height: '4%' }}>
                {currentTextChannel.name}
              </h2>
              <div className='channelGrid' style={{ backgroundColor: 'rgb(0,0,0,.8)' }}>
                <div style={{ height: '100%' }}>
                  <Message type={CHANNEL_MESSAGES} />
                </div>
                <input
                  placeholder='Talk Some Trash Talk..'
                  style={{ height: '100%', width: '100%', margin: '0', padding: '0', backgroundColor: 'black', color: 'white' }}
                  value={message}
                  onChange={({ target: { value } }) => setMessage(messageDispatch, value)}
                  onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
                />
              </div>
            </div>
          </div>
        </div>
      );
  } else return null;
};
