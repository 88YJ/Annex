import React, { useState, useContext } from "react";
import ServerlistContext from "../../context/serverlists/serverlistContext";

const CreateServerForm = () => {
 const serverlistContext = useContext(ServerlistContext);
 const [server, setServer] = useState({
  name: "",
  img: "",
 });

 const { name, img } = server;

 const onChange = (e) =>
  setServer({ ...server, [e.target.name]: e.target.value });

 const onSubmit = (e) => {
  e.preventDefault();
  serverlistContext.createServer(server);
  setServer({
   name: "",
   img: "",
  });
 };

 return (
  <form onSubmit={onSubmit}>
   <h2>Create a Server</h2>
   <input
    type='text'
    placeholder='Sever Name'
    name='name'
    value={name}
    onChange={onChange}
   />
   <input
    type='url'
    placeholder='Image URL'
    name='img'
    value={img}
    onChange={onChange}
   />
   <div>
    <input type='submit' value='Create Server' />
   </div>
  </form>
 );
};

export default CreateServerForm;
