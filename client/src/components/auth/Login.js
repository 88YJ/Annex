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
  <div className='register'>
   <h1 className='center' style={{ background: 'black' }}>
    Account Login
   </h1>
   <div className='registerGrid'>
    <div></div>
    <div className='registerloginbackground'>
     <form onSubmit={onSubmit}>
      <div className='form-group'>
       <h2>Email Address:</h2>
       <input
        className='registerloginvalues'
        type='email'
        name='email'
        value={email}
        onChange={onChange}
        required
       />
      </div>
      <div className='form-group'>
       <h2>Password:</h2>
       <input
        className='registerloginvalues'
        type='password'
        name='password'
        value={password}
        onChange={onChange}
        required
       />
      </div>
      <input
       type='submit'
       value='Login'
       className='globalbutton registerbutton'
      />
     </form>
    </div>
    <div></div>
   </div>
  </div>
 );
};

export default Login;
