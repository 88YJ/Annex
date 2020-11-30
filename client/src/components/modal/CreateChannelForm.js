import React, { useState } from 'react';

import { useServerDispatch, useServerState, createChannel } from '../../pages/server/context'

export const CreateChannelForm = () => {
    const serverDispatch = useServerDispatch()
    const {currentServer} = useServerState()

 const [channel, setChannel] = useState({
  name: '',
  voiceChannel: false,
  owner: currentServer._id,
 });

 const { name, voiceChannel } = channel;

 const onChange = (e) =>
  setChannel({ ...channel, [e.target.name]: e.target.value });

 const onSubmit = (e) => {
  e.preventDefault();
  createChannel(serverDispatch, channel, currentServer._id);
  setChannel({
   name: '',
   voiceChannel: false,
   owner: currentServer._id,
  });
 };

 return (
  <form style={{ height: 'auto' }} onSubmit={onSubmit}>
   <h2 className='GeneralHeaders'>Create a Channel</h2>
   <input
    className='GeneralHeaders'
    type='text'
    placeholder='Channel Name'
    name='name'
    value={name}
    onChange={onChange}
   />
   <h5 className='GeneralHeaders'>Channel Type</h5>
   <input
    className='GeneralHeaders'
    type='radio'
    name='voiceChannel'
    value={true}
    checked={voiceChannel === 'true'}
    onChange={onChange}
    style={{height:'10px', width:'10px'}}
   />{' '}
   Voice Channel
   <input
    className='GeneralHeaders'
    type='radio'
    name='voiceChannel'
    value={false}
    checked={voiceChannel === 'false'}
    onChange={onChange}
    style={{height:'10px', width:'10px'}}
   />
   Text Channel
   <div style={{ height: 'auto' }}>
    <input
     className='GeneralHeaders globalbutton'
     type='submit'
     value='Create Channel'
    />
   </div>
  </form>
 );
};