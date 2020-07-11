import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectChat = ({ component: Component, ...rest }) => {
 return <Redirect to='/server' />;
};

export default RedirectChat;
