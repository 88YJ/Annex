import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

const ServerPage = () => {
 const authContext = useContext(AuthContext);

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 return <div>Server</div>;
};

export default ServerPage;
