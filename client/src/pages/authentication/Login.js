import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { loginUser, useAuthState, useAuthDispatch } from "./context";

export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAuthDispatch();
    const { loading, errorMessage, isLoggedIn } = useAuthState();

    const onSubmit = async (e) => {
        e.preventDefault();
        let payload = { email, password };
        try {
            let response = await loginUser(dispatch, payload);
            if (!response) {
                return;
            }
            props.history.push("/");
        } catch (error) {
            console.error(error);
        }
    }

    let redirectRoute;

    if (isLoggedIn) {
        const renderComponent = () => (<Redirect to={{ pathname: "/" }} />);
        redirectRoute = <Route {...props} component={renderComponent} render={undefined} />
    }

    return (
        <div className='register'>
            {redirectRoute}
            <h1 className='sidebarheaders' style={{ background: 'black' }}>
                Account Login
            </h1>
            <div className='registerGrid'>
                <div />
                <div className='registerloginbackground'>
                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <h2 className='sidebarheaders'>Email Address:</h2>
                            <input
                                className='registerloginvalues'
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className='form-group'>
                            <h2 className='sidebarheaders'>Password:</h2>
                            <input
                                className='registerloginvalues'
                                type='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <input
                            style={{ height: 'auto', width: 'auto' }}
                            type='submit'
                            value='Login'
                            className='globalbutton registerbutton'
                        />
                    </form>
                </div>
            </div>
        </div>
    )
};