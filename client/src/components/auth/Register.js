import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
 const alertContext = useContext(AlertContext);
 const authContext = useContext(AuthContext);

 const { setAlert } = alertContext;

 const { register, error, clearErrors, isAuthenticated } = authContext;

 useEffect(() => {
  if (isAuthenticated) {
   props.history.push('/');
  }
  if (error === 'User already exists') {
   setAlert(error, 'danger');
   clearErrors();
  }
  // eslint-disable-next-line
 }, [error, isAuthenticated, props.history]);

 const [user, setUser] = useState({
  name: '',
  email: '',
  password: '',
  password2: '',
 });

 const { name, email, password, password2 } = user;

 const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

 const onSubmit = (e) => {
  e.preventDefault();
  if (name === '' || email === '' || password === '') {
   setAlert('Please Enter all fields', 'danger');
  } else if (password !== password2) {
   setAlert('Passwords do not match', 'danger');
  } else {
   register({
    name,
    email,
    password,
   });
  }
 };

 return (
  <div className='register-login'>
   <h1 className='globalHeader' style={{ background: 'black' }}>
    Account Register
   </h1>
   <div className='register-login-Grid'>
    <div></div>
    <div>
     <form onSubmit={onSubmit}>
      <div className='register-login-Form'>
       <h2 className='globalHeader'>Name:</h2>
       <input
        style={{ height: 'auto', width: 'auto' }}
        className='register-login-Values'
        type='text'
        name='name'
        value={name}
        onChange={onChange}
        required
       />
      </div>
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
        minLength='6'
       />
      </div>
      <div className='register-login-Form'>
       <h2 className='globalHeader'>Confirm Password:</h2>
       <input
        style={{ height: 'auto', width: 'auto' }}
        className='register-login-Values'
        type='password'
        name='password2'
        value={password2}
        onChange={onChange}
        required
        minLength='6'
       />
      </div>
      <input
       style={{ height: 'auto', width: 'auto', marginTop: '6px' }}
       type='submit'
       value='Register'
       className='globalbutton'
      />
     </form>
    </div>
    <div></div>
   </div>
  </div>
 );
};

export default Register;
