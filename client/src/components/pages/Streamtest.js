import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamShow from '../streams/StreamShow';

const Streamtest = () => {
 return (
  <div>
   <Route path='/streams/6' exact component={StreamShow} />
  </div>
 );
};

export default Streamtest;
