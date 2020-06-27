import React, { useReducer } from 'react';
import DashContext from './dashContext';
import dashReducer from './dashReducer';
import { GET_DASH } from '../types';
import Axios from 'axios';

const DashState = (props) => {
 const initialState = {
  games: [
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
   {
    name: 'Halo 4',
    img: 'https://cdn.wallpapersafari.com/47/20/FKDxr4.jpg',
   },
  ],
  stream: [
   {
    name: 'Ninja',
    img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
   },
   {
    name: 'Ninja',
    img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
   },
   {
    name: 'Ninja',
    img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
   },
   {
    name: 'Ninja',
    img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
   },
   {
    name: 'Ninja',
    img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
   },
   {
    name: 'Ninja',
    img: 'https://a.espncdn.com/photo/2018/0917/r432464_1600x800cc.jpg',
   },
  ],
 };

 const [state, dispatch] = useReducer(dashReducer, initialState);

 return (
  <DashContext.Provider
   value={{
    games: state.games,
    stream: state.stream,
   }}
  >
   {props.children}
  </DashContext.Provider>
 );
};

export default DashState;
