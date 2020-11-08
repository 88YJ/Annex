import React from 'react';
import { Link } from 'react-router-dom';
import { useMessageState } from './context';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import { useSideBarDispatch, showGames } from '../../components/sidebar/context';
import { STREAM_MESSAGES, CHANNEL_MESSAGES } from './context/types';

export const Message = (props) => {
  const { type } = props;

  const { StreamMessages, ChannelMessages } = useMessageState();
  const sidebarDispatch = useSideBarDispatch();

  function changesidebar() {
    document.getElementsByTagName('div')[3].setAttribute('class', 'app-mainGrid');
    showGames(sidebarDispatch);
  }
  switch (type) {
    case STREAM_MESSAGES:
      if (StreamMessages) {
        return (
          <>
            <ScrollToBottom className='messages'>
              {StreamMessages.map((message, i) => (
                <div className='messageContainer' key={i}>
                  <div className='profileInfoContainer'>
                    <Link onClick={() => changesidebar()} to={`/profile/${message.userId}`} style={{ height: '25px', width: '25px' }}>
                      <div className='profilepicture' style={{ backgroundImage: `url(${message.profilepicture})`, height: '25px', width: '25px' }} />
                    </Link>
                    <h4 className='streamChatUsername' style={{ color: 'red' }}>
                      {message.name}
                    </h4>
                  </div>
                  <div className='messageBox'>
                    <p className='messageText'>{ReactEmoji.emojify(message.text)}</p>
                  </div>
                </div>
              ))}
            </ScrollToBottom>
          </>
        );
      } else return null;
    case CHANNEL_MESSAGES:
      if (ChannelMessages) {
        return (
          <>
            <ScrollToBottom className='messages'>
              {ChannelMessages.map((message, i) => (
                <div className='messageContainer' style={{ backgroundColor: 'rgb(0,0,0, .5)' }} key={i}>
                  <div className='profileInfoContainer'>
                    <Link to={`/profile/${message.userId}`} style={{ height: '43px', width: '43px' }}>
                      <div className='profilepicture' style={{ backgroundImage: `url(${message.profilepicture})`, height: '43px', width: '43px' }} />
                    </Link>
                    <h4 className='streamChatUsername' style={{ color: 'red' }}>
                      {message.name}
                    </h4>
                  </div>
                  <div className='messageBox'>
                    <p className='messageText'>{ReactEmoji.emojify(message.text)}</p>
                  </div>
                </div>
              ))}
            </ScrollToBottom>
          </>
        );
      } else return null;
    default:
      return null;
  }
};
