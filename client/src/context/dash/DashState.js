import React, { useReducer } from 'react';
import DashContext from './dashContext';
import dashReducer from './dashReducer';

const DashState = (props) => {
 const initialState = {
  trendgames: [
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Skyrim',
    img:
     'https://img-eshop.cdn.nintendo.net/i/3a41386d4b0999365727a21cc5c13853cfc244abca39b689bb79a339601e48c3.jpg?w=1000',
   },
   {
    name: 'Star Wars:BattleFront II',
    img:
     'https://media.contentapi.ea.com/content/dam/walrus/en-us/migrated-images/2017/04/reveal-swbf2-fb-meta-image-alt.png.adapt.crop191x100.1200w.png',
   },
   {
    name: 'Call of Duty: Black Ops 4',
    img:
     'https://i1.wp.com/therefinedgeek.com.au/wp-content/uploads/2018/10/Call-of-Duty-Black-Ops-4-Review-Screenshot-Wallpaper-Title-Screen.jpg?ssl=1',
   },
   {
    name: 'Warframe',
    img:
     'https://www.androidcentral.com/sites/androidcentral.com/files/styles/mediumplus/public/article_images/2020/07/warframe-image.jpg',
   },
  ],
  trendstream: [
   {
    name: 'Ninja',
    img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
   },
   {
    name: 'Shroud',
    img:
     'https://img1.looper.com/img/gallery/how-much-did-shroud-really-make-from-mixer/intro-1593116396.jpg',
   },
   {
    name: 'Dr. Disrespect',
    img:
     'https://cdn1.dotesports.com/wp-content/uploads/2019/11/13100524/drdisrespect-screengrab.jpg',
   },
   {
    name: 'Summit1g',
    img:
     'https://cdn1.dotesports.com/wp-content/uploads/2018/12/26150907/summit1g.png',
   },
   {
    name: 'Dr. Lupo',
    img:
     'https://image.cnbcfm.com/api/v1/image/106091661-1566476702259drlupo-rogue-2.jpg?v=1566476731&w=678&h=381',
   },
   {
    name: 'Lost in our Stars',
    img: 'https://wallpaperaccess.com/full/1584309.jpg',
   },
   {
    name: 'Music On Demand',
    img:
     'https://lh3.googleusercontent.com/proxy/yyZmI1VCxXIcn-CyAKfozBwyc5eH28r9pRhDhvNJYfqlbToiThQP4UgQH6bigFBC2wVb1wIUKeudBHMF1JnCnWATA62AhfNFIimoGMYoC7iSeQsU0Ley95Xin3imEa8GW7INUHcdRWBPfj5kuQ',
   },
   {
    name: 'April',
    img: 'https://wallpaperaccess.com/full/44729.jpg',
   },
   {
    name: 'Ninja',
    img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
   },
   {
    name: 'Shroud',
    img:
     'https://img1.looper.com/img/gallery/how-much-did-shroud-really-make-from-mixer/intro-1593116396.jpg',
   },
   {
    name: 'Dr. Disrespect',
    img:
     'https://cdn1.dotesports.com/wp-content/uploads/2019/11/13100524/drdisrespect-screengrab.jpg',
   },
   {
    name: 'Summit1g',
    img:
     'https://cdn1.dotesports.com/wp-content/uploads/2018/12/26150907/summit1g.png',
   },
   {
    name: 'Dr. Lupo',
    img:
     'https://image.cnbcfm.com/api/v1/image/106091661-1566476702259drlupo-rogue-2.jpg?v=1566476731&w=678&h=381',
   },
   {
    name: 'Lost in our Stars',
    img: 'https://wallpaperaccess.com/full/1584309.jpg',
   },
  ],
 };

 const [state, dispatch] = useReducer(dashReducer, initialState);

 return (
  <DashContext.Provider
   value={{
    trendgames: state.trendgames,
    trendstream: state.trendstream,
   }}
  >
   {props.children}
  </DashContext.Provider>
 );
};

export default DashState;
