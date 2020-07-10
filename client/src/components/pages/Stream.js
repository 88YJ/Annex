import React from 'react';

const Stream = () => {
 return (
  <div className='stream'>
   <div className='streamgrid'>
    <div
     className='streamvideo'
     style={{
      backgroundImage: `url('https://images.gamersyde.com/image_stream-23809-2670_0002.jpg')`,
     }}
    ></div>
    <div
     className='footerbackground'
     style={{
      backgroundImage: `url('https://i0.wp.com/5ergiveaways.com/wp-content/uploads/2018/09/BG.png?fit=2560%2C1440&ssl=1')`,
     }}
    >
     <div className='streamfooter'>
      <div className='leftstreamfooter'>
       <div
        className='profilepicture'
        style={{
         backgroundImage: `url('https://ubistatic19-a.akamaihd.net/ubicomstatic/en-GB/global/media/Header_1600x1000_264197.jpg')`,
        }}
       ></div>
       <h2>YourName</h2>
      </div>
      <div></div>
      <div className='rightstreamfooter'>
       <button className='globalbutton'>Follow</button>{' '}
       <button className='globalbutton'>Subscribe!</button>
      </div>
     </div>
    </div>
   </div>
   <div
    className='streambelowbackground'
    style={{
     backgroundImage: `url('https://cdn.statically.io/img/www.wallpapers13.com/wp-content/uploads/2015/12/Fantastic-universe-mz-space-stars-galaxies-Ultra-HD-Desktop-1920x1080.jpg')`,
    }}
   >
    <div className='streambelow'>
     <div>
      <button className='globalbutton'>Profile</button>
      <button className='globalbutton'>Followers</button>
      <button className='globalbutton'>Following</button>
     </div>
     <div>
      <ul>
       <li></li>
      </ul>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Stream;
