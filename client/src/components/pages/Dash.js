import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

const Dash = () => {
 const authContext = useContext(AuthContext);

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 return <div>Dash</div>;
};

export default Dash;
