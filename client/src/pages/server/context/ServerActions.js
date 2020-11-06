import { LOAD_CURRENT_SERVER, LOAD_CURRENT_CHANNEL, LOAD_USER_JOINED_SERVERS, LOAD_SERVER_USERLIST, LOAD_SERVER_CHANNELLIST } from './types';
import axios from 'axios';

const requestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function loadJoinedServers(dispatch) {
  try {
    const response = await axios.get('/api/servers/joinedservers', requestConfig);
    if (response.data) {
      dispatch({ type: LOAD_USER_JOINED_SERVERS, payload: response.data });
      console.log('Joined servers loaded successfully.');
    }
  } catch (error) {
    console.error(error);
  }
}

export function loadCurrentServer(dispatch, server) {
  try {
    dispatch({ type: LOAD_CURRENT_SERVER, payload: server });
    console.log('Server loaded successfully.');
  } catch (error) {
    console.error(error);
  }
}

export async function loadCurrentChannel(dispatch, channel) {
  try {
    dispatch({ type: LOAD_CURRENT_CHANNEL, payload: channel });
    console.log('Channel loaded successfully.');
  } catch (error) {
    console.error(error);
  }
}

export async function loadServerChannelList(dispatch, server) {
  try {
    let channelList = JSON.stringify(server.channelList);
    console.log(server);

    const response = await axios.get(`/api/${server._id}/channels/${channelList}`, requestConfig);
    dispatch({ type: LOAD_SERVER_CHANNELLIST, payload: response.data });
    console.log('Server channels loaded successfully.');
  } catch (error) {
    console.error(error);
  }
}

export async function loadServerUserList(dispatch, server) {
  try {
    const response = await axios.get(`/api/servers/${server._id}/users`, requestConfig);
    dispatch({ type: LOAD_SERVER_USERLIST, payload: response.data });
    console.log('Server users loaded successfully.');
  } catch (error) {
    console.error(error);
  }
}
