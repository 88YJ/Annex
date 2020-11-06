import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../pages/authentication/context';

//Component imports
import { ServerList } from './ServerList';
import { SubMenu } from './SubMenu';

//Import images
import PlusIcon from '../../images/PlusIcon.png';
import SearchIcon from '../../images/SearchIcon.png';
import StreamIcon from '../../images/StreamIcon.png';
import CartIcon from '../../images/CartIcon.png';

import { useProfileDispatch, getFriends } from '../../pages/profile/context';
import { useServerState, useServerDispatch, loadServerChannelList } from '../../pages/server/context';
import { useSideBarDispatch, showGames } from '../../components/sidebar/context';

//Import Types
import { SHOW_SHOP_SUBMENU, SHOW__HOME_SUBMENU, SHOW_STREAM_SUBMENU } from './types/types';

import { useSocketState, useSocketDispatch } from '../socketManager';
import { connectSocket } from '../socketManager/socketActions';

export const Header = () => {
  const sidebarDispatch = useSideBarDispatch();
  const { user, isLoggedIn } = useAuthState();
  const profileDispatch = useProfileDispatch();
  const serverDispatch = useServerDispatch();
  const { currentServer } = useServerState();
  const socketDispatch = useSocketDispatch();
  const { socket } = useSocketState();

  useEffect(() => {
    if (!socket && user) {
      connectSocket(socketDispatch);
    }
  }, [socket, socketDispatch]);
  useEffect(() => {
    if (socket && user) {
      socket.on('userIdRequest', async () => {
        socket.emit('returnId', user._id, user.friendList);
      });
      socket.on('FriendUpdate', async (data) => {
        getFriends(profileDispatch);
      });

      socket.on('ServerUpdate', async (data) => {
        loadServerChannelList(serverDispatch, data);
      });
    }
  }, [socket, user]);

  let navigationLinks;

  function changesidebar() {
    document.getElementsByTagName('div')[3].setAttribute('class', 'app-mainGrid');
    showGames(sidebarDispatch);
  }

  if (isLoggedIn) {
    navigationLinks = (
      <Fragment>
        <li onClick={() => changesidebar()}>
          <Link to='/'>
            <div className='NavIcons' style={{ backgroundImage: `url(${user.profilePicture})` }} />
          </Link>
          <SubMenu type={SHOW__HOME_SUBMENU} />
        </li>
        <li onClick={() => changesidebar()}>
          <Link to='/shop'>
            <div className='NavIcons' style={{ backgroundImage: `url(${CartIcon})` }} />
          </Link>
          <SubMenu type={SHOW_SHOP_SUBMENU} />
        </li>
        <li>
          <Link to='/stream'>
            <div className='NavIcons' style={{ backgroundImage: `url(${StreamIcon})` }} />
          </Link>
          <SubMenu type={SHOW_STREAM_SUBMENU} />
        </li>
        <li onClick={() => changesidebar()}>
          <Link to='/'>
            <div className='NavIcons' style={{ backgroundImage: `url(${SearchIcon})` }} />
          </Link>
        </li>
        <li style={{ marginTop: '3px', borderBottom: 'red 1px solid', paddingBottom: '4px', cursor: 'pointer' }} key='addServer' /*onClick={displayModal}*/>
          <div className='NavIcons' style={{ backgroundImage: `url(${PlusIcon})` }} />
        </li>
      </Fragment>
    );
  } else {
    navigationLinks = (
      <Fragment>
        <li>
          <Link to='/'>Dashoard</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </Fragment>
    );
  }
  return (
    <div className='Nav'>
      <ul>
        {navigationLinks}
        <ServerList />
      </ul>
      <div className='NavSubMenu'></div>
    </div>
  );
};
