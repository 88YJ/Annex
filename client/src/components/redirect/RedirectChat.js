import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectChat = ({ component: Component, ...rest }) => {
 return <Redirect to='/server' />;
};

export default RedirectChat;
