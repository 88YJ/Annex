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
  <button className='sendButton' onClick={(e) => sendMessage(e)}>
   Send
  </button>
 </form>
);

export default Input;
