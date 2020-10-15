import React from 'react';

const Input = ({ setMessage, sendMessage, message }) => (
 <form className='form'>
  <input
   className='chat-Input'
   type='text'
   placeholder='Type some trash talk..'
   value={message}
   onChange={({ target: { value } }) => setMessage(value)}
   onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
  />
 </form>
);

export default Input;
