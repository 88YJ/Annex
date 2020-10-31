import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
 render() {
  const { data, profile, server, openProfile, joinServer } = this.props;
  if (profile) {
   return (
    <>
     <ul>
      {data.map((item, i) => (
       <Link to='/profilepage' key={i} onClick={() => openProfile(item)}>
        <li
         className='banner'
         style={{
          backgroundImage: `url(${item.profileBanner})`,
         }}
        >
         <div
          className='profilepicture'
          style={{
           backgroundImage: `url(${item.profilePicture})`,
           border: 'black 3px solid',
          }}
         ></div>
         <h2 style={{ backgroundColor: 'rgb(0,0,0,.8)' }}>{item.name}</h2>
        </li>
       </Link>
      ))}
     </ul>
    </>
   );
  } else if (server) {
   return (
    <>
     <ul>
      {data.map((item, i) => (
       <Link to='#' key={i} onClick={() => joinServer(item)}>
        <li
         className='banner'
         style={{
          backgroundImage: `url(${item.img})`,
         }}
        >
         <h2 style={{ backgroundColor: 'rgb(0,0,0,.8)' }}>{item.name}</h2>
        </li>
       </Link>
      ))}
     </ul>
    </>
   );
  }
 }
}

export default Search;
