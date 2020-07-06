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
  <div className='register'>
   <h1 className='center' style={{ background: 'black' }}>
    Account Register
   </h1>
   <div className='registerGrid'>
    <div></div>
    <div className='registerloginbackground'>
     <form onSubmit={onSubmit}>
      <div className='form-group'>
       <h2>Name:</h2>
       <input
        className='registerloginvalues'
        type='text'
        name='name'
        value={name}
        onChange={onChange}
        required
       />
      </div>
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
        minLength='6'
       />
      </div>
      <div className='form-group'>
       <h2>Confirm Password:</h2>
       <input
        className='registerloginvalues'
        type='password'
        name='password2'
        value={password2}
        onChange={onChange}
        required
        minLength='6'
       />
      </div>
      <input
       type='submit'
       value='Register'
       className='globalbutton registerbutton'
      />
     </form>
    </div>
    <div></div>
   </div>
  </div>
 );
};

export default Register;
