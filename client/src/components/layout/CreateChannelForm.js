import React, { useState, useContext } from 'react';
import ServerContext from '../../context/server/serverContext';

const CreateChannelForm = () => {
 const serverContext = useContext(ServerContext);

 const { createChannel, server } = serverContext;

 const [channel, setChannel] = useState({
  name: '',
  voiceChannel: false,
  owner: server._id,
 });

 const { name, voiceChannel } = channel;

 const onChange = (e) =>
  setChannel({ ...channel, [e.target.name]: e.target.value });

 const onSubmit = (e) => {
  e.preventDefault();
  createChannel(channel);
  setChannel({
   name: '',
   voiceChannel: false,
   owner: server._id,
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
   />{' '}
   Voice Channel
   <input
    className='GeneralHeaders'
    type='radio'
    name='voiceChannel'
    value={false}
    checked={voiceChannel === 'false'}
    onChange={onChange}
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

export default CreateChannelForm;
