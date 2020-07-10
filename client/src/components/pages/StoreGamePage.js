import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import StoreContext from '../../context/store/storeContext';

const StoreGamePage = () => {
 const authContext = useContext(AuthContext);

 const storeContext = useContext(StoreContext);

 const { addToCart, gamepage } = storeContext;

 useEffect(() => {
  authContext.loadUser();

  // eslint-disable-next-line
 }, []);

 function add() {
  addToCart(gamepage);
 }
 if (!authContext.user) {
  return <Redirect to='/store' />;
 } else {
  return (
   <div
    className='gamestorepage'
    style={{
     backgroundImage: `url(${gamepage.backgroundimg})`,
    }}
   >
    <div className='film'>
     <div className='storepagecomponents'>
      <div className=' storegamename'>
       <Link
        to='/store'
        className='globalbutton'
        style={{ position: 'absolute', color: 'white', textAlign: 'center' }}
       >
        Back
       </Link>
       <h1 className='center'>{gamepage.name}</h1>
      </div>

      <div className='storepagecomponent1'>
       <div className='storepagecomponent2'>
        <div
         className='gamestorepageimg'
         style={{
          backgroundImage: `url(${gamepage.wideimg})`,
         }}
        ></div>
        <div>
         <h2>Game Desc:</h2>{' '}
         <p style={{ color: 'white' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, esse.
          Eius et dolorem aspernatur vitae laudantium magnam vero natus ab
          deleniti, voluptate architecto debitis veniam asperiores suscipit,
          sunt fugit ullam! Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Corrupti, at libero dolor rem vitae, accusantium facilis
          praesentium illo voluptates vel repellendus explicabo reprehenderit
          nam laboriosam repellat blanditiis quod, sit recusandae?
         </p>
        </div>
       </div>
       <div className='storepagecomponent2'>
        <div className='storesubcomponent'>
         <div>
          <h2>
           Ratings: <span style={{ color: 'red' }}>4.5</span>
          </h2>
          <h3>
           Recent Ratings: <span style={{ color: 'red' }}>4.1</span>
          </h3>
          <h4>
           Our Ratings: <span style={{ color: 'red' }}>5</span>
          </h4>
         </div>
         <div className='footerbutton'>
          <button onClick={add} className='addcartbutton'>
           Add to cart
          </button>
         </div>
        </div>
        <div className='reviews'>
         <h2>Review Comments:</h2>
         <ul>
          <li>
           <h5>
            User: <span style={{ color: 'red' }}>BabyJesus</span>
           </h5>
           <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            quidem quasi fuga laudantium ipsam ut earum laborum laboriosam,
            consectetur reiciendis odit voluptates? Velit voluptates, non sunt
            dicta animi repudiandae voluptatibus?
           </p>
          </li>
          <li>
           <h5>
            User: <span style={{ color: 'red' }}>Rejis</span>
           </h5>
           <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            quidem quasi fuga laudantium ipsam ut earum laborum laboriosam,
            consectetur reiciendis odit voluptates? Velit voluptates, non sunt
            dicta animi repudiandae voluptatibus?
           </p>
          </li>
          <li>
           <h5>
            User: <span style={{ color: 'red' }}>Parathax</span>
           </h5>
           <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            quidem quasi fuga laudantium ipsam ut earum laborum laboriosam,
            consectetur reiciendis odit voluptates? Velit voluptates, non sunt
            dicta animi repudiandae voluptatibus?
           </p>
          </li>
          <li>
           <h5>
            User: <span style={{ color: 'red' }}>Flipster</span>
           </h5>
           <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            quidem quasi fuga laudantium ipsam ut earum laborum laboriosam,
            consectetur reiciendis odit voluptates? Velit voluptates, non sunt
            dicta animi repudiandae voluptatibus?
           </p>
          </li>
          <li>
           <h5>
            User: <span style={{ color: 'red' }}>Commissar</span>
           </h5>
           <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            quidem quasi fuga laudantium ipsam ut earum laborum laboriosam,
            consectetur reiciendis odit voluptates? Velit voluptates, non sunt
            dicta animi repudiandae voluptatibus?
           </p>
          </li>
         </ul>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 }
};

export default StoreGamePage;
