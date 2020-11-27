import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuthDispatch, useAuthState, registerUser } from './context'

export const Register = (props) => {
    const authDispatch = useAuthDispatch()
    const { loading, isLoggedIn } = useAuthState()

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = user

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        let payload = { name, email, password, password2 }
        try {
            let response = await registerUser(authDispatch, payload)
            console.log('waiting')
            if (!response) {
                return
            }
            props.history.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    let redirectRoute
    if (isLoggedIn) {
        const renderComponent = () => <Redirect to={{ pathname: '/' }} />
        redirectRoute = <Route {...props} component={renderComponent} render={undefined} />
    }

    return (
        <div className='register-login'>
            {redirectRoute}
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
                                disabled={loading}
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
                                disabled={loading}
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
                                disabled={loading}
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
                                disabled={loading}
                            />
                        </div>
                        <input style={{ height: 'auto', width: 'auto', marginTop: '6px' }} type='submit' value='Register' className='globalbutton' />
                    </form>
                </div>
                <div></div>
            </div>
        </div>
    )
}
