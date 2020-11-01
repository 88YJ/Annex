import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch, logout } from "../../pages/authentication/context";
import { ServerList } from "./ServerList";

//Import images
import PlusIcon from '../../images/PlusIcon.png';
import SearchIcon from '../../images/SearchIcon.png';

export const Header = () => {
    const { user, isLoggedIn } = useAuthState();
    const authDispatch = useAuthDispatch();

    let navigationLinks;

    if (isLoggedIn) {
        navigationLinks = (
            <Fragment>
                <li>
                    <Link to='/'>
                        <div
                            className='navpicture'
                            style={{ backgroundImage: `url(${user.profilePicture})` }} >
                        </div>
                    </Link>
                    <div className='subMenu'>
                        <ul>
                            <li>
                                <Link to='/'>My Profile</Link>
                            </li>
                            <li>
                                <Link to='/' onClick={() => logout(authDispatch)}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link to='/store'>
                        <div
                            className='navicons'
                            style={{
                                backgroundImage: `url("https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-shopping-cart-icon-png-image_889692.jpg")`,
                            }}
                        ></div>
                    </Link>
                    <div className='subMenu'>
                        <ul>
                            <li>
                                <Link to='/'>Cart</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link to='/'>
                        <div
                            className='navicons'
                            style={{
                                backgroundImage: `url("https://faithvox.s3.amazonaws.com/wp-content/uploads/sites/5/2016/09/05195814/live.jpg")`,
                            }}
                        ></div>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <div
                            className='navicons'
                            style={{
                                backgroundImage: `url(${SearchIcon})`,
                            }}
                        ></div>
                    </Link>
                </li>
                <li
                    style={{
                        borderBottom: 'red 1px solid',
                        paddingBottom: '4px',
                        cursor: 'pointer',
                    }}
                    key='addServer'
                    /*onClick={displayModal}*/>
                    <div
                        className='navicons'
                        style={{
                            backgroundImage: `url(${PlusIcon})`,
                        }}>
                    </div>
                </li>
            </Fragment>
        );
    } else {
        navigationLinks = (
            <Fragment>
                <li>
                    <Link to='/'>Dashoard</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </Fragment>
        );
    }
    return (
        <div className='Nav'>
            <div className='Navlower'>
                <div>
                    <ul>
                        {navigationLinks}
                        <ServerList />
                    </ul>
                </div>
            </div>
        </div>
    );
}