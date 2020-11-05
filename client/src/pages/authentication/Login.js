import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { loginUser, useAuthState, useAuthDispatch } from './context';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAuthDispatch();
  const { loading, isLoggedIn } = useAuthState();

  const onSubmit = async (e) => {
    e.preventDefault();
    let payload = { email, password };
    try {
      let response = await loginUser(dispatch, payload);
      if (!response) {
        return;
      }
      props.history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  let redirectRoute;

  if (isLoggedIn) {
    const renderComponent = () => <Redirect to={{ pathname: '/' }} />;
    redirectRoute = <Route {...props} component={renderComponent} render={undefined} />;
  }

  return (
    <div className='register-login'>
      {redirectRoute}
      <h1 className='globalHeader' style={{ background: 'black' }}>
        Account Login
      </h1>
      <div className='register-login-Grid'>
        <div />
        <div>
          <form onSubmit={onSubmit}>
            <div className='register-login-Form'>
              <h2 className='globalHeader'>Email Address:</h2>
              <input
                className='register-login-Values'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{ height: 'auto', width: ' auto' }}
              />
            </div>
            <div className='register-login-Form'>
              <h2 className='globalHeader'>Password:</h2>
              <input
                className='register-login-Values'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={{ height: 'auto', width: ' auto' }}
              />
            </div>
            <input style={{ height: 'auto', width: 'auto' }} type='submit' value='Login' className='globalbutton' />
          </form>
        </div>
      </div>
    </div>
  );
};
