import React, { useState, useContext } from 'react';
import ServerContext from '../../context/server/serverContext';

const CreateServerForm = () => {
 const serverContext = useContext(ServerContext);
 const [server, setServer] = useState({
  name: '',
  img: '',
 });

 const { name, img } = server;

 const onChange = (e) =>
  setServer({ ...server, [e.target.name]: e.target.value });

 const onSubmit = (e) => {
  e.preventDefault();
  serverContext.createServer(server);
  setServer({
   name: '',
   img: '',
  });
 };

 return (
  <form onSubmit={onSubmit}>
   <h2 className='GeneralHeaders'>Create a Server</h2>
   <input
    className='GeneralHeaders'
    type='text'
    placeholder='Sever Name'
    name='name'
    value={name}
    onChange={onChange}
   />
   <input
    className='GeneralHeaders'
    type='url'
    placeholder='Image URL'
    name='img'
    value={img}
    onChange={onChange}
   />
   <div>
    <input
     className='GeneralHeaders globalbutton'
     type='submit'
     value='Create Server'
    />
   </div>
  </form>
 );
};

export default CreateServerForm;
