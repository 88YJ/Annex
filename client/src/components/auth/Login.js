import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
 const alertContext = useContext(AlertContext);
 const authContext = useContext(AuthContext);

 const { setAlert } = alertContext;

 const { login, error, clearErrors, isAuthenticated } = authContext;

 useEffect(() => {
  if (isAuthenticated) {
   props.history.push('/');
  }
  if (error === 'Invalid Credentials') {
   setAlert(error, 'danger');
   clearErrors();
  }
  // eslint-disable-next-line
 }, [error, isAuthenticated, props.history]);

 const [user, setUser] = useState({
  email: '',
  password: '',
 });

 const { email, password } = user;

 const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

 const onSubmit = (e) => {
  e.preventDefault();
  if (email === '' || password === '') {
   setAlert('Please fill in all fields', 'danger');
  } else {
   login({
    email,
    password,
   });
  }
 };

 return (
  <div className='register-login'>
   <h1 className='globalHeader' style={{ background: 'black' }}>
    Account Login
   </h1>
   <div className='register-login-Grid'>
    <div></div>
    <div>
     <form onSubmit={onSubmit}>
      <div className='register-login-Form'>
       <h2 className='globalHeader'>Email Address:</h2>
       <input
        style={{ height: 'auto', width: 'auto' }}
        className='register-login-Values'
        type='email'
        name='email'
        value={email}
        onChange={onChange}
        required
       />
      </div>
      <div className='register-login-Form'>
       <h2 className='globalHeader'>Password:</h2>
       <input
        style={{ height: 'auto', width: 'auto' }}
        className='register-login-Values'
        type='password'
        name='password'
        value={password}
        onChange={onChange}
        required
       />
      </div>
      <input
       style={{ height: 'auto', width: 'auto', marginTop: '6px' }}
       type='submit'
       value='Login'
       className='globalbutton'
      />
     </form>
    </div>
    <div></div>
   </div>
  </div>
 );
};

export default Login;
