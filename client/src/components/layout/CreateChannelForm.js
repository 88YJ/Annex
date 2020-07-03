import React, { useState, useContext } from "react";
import ServerContext from "../../context/server/serverContext";

const CreateChannelForm = () => {
 const serverContext = useContext(ServerContext);

 const { createChannel, server } = serverContext;

 const [channel, setChannel] = useState({
  name: "",
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
   name: "",
   voiceChannel: false,
   owner: server._id,
  });
 };

 return (
  <form onSubmit={onSubmit}>
   <h2>Create a Channel</h2>
   <input
    type='text'
    placeholder='Sever Name'
    name='name'
    value={name}
    onChange={onChange}
   />
   <div>
    <input type='submit' value='Create Channel' />
   </div>
  </form>
 );
};

export default CreateChannelForm;
