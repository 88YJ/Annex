import React from 'react';

import '../chatcss/InfoBar.css';

const InfoBar = ({ room }) => (
 <div className='infoBar'>
  <div className='leftInnerContainer'>
   <h3>{room}</h3>
  </div>
  <div className='rightInnerContainer'>
   <a href='/'></a>
  </div>
 </div>
);

export default InfoBar;
