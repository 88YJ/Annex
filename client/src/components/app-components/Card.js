import React from 'react';

class Card extends React.Component {
 render() {
  const { data, screenshot, SSLink } = this.props;
  if (screenshot) {
   return (
    <>
     {data.map((item, index) => (
      <div className='card' key={index} onClick={() => SSLink(item)}>
       <img src={item} alt=''></img>
      </div>
     ))}
    </>
   );
  } else {
   return (
    <>
     {data.map((item, index) => (
      <div className='card' key={index}>
       <img src={item.img} alt=''></img>
       <h2 className='globalheader'>{item.name}</h2>
      </div>
     ))}
    </>
   );
  }
 }
}

export default Card;
