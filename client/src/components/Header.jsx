import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUser,
    userSelector,
    logout,
    clearState,
} from '../features/User/UserSlice';

import { clearState as clearRestaurantState } from '../features/Restaurant/RestaurantSlice';

import Login from './Login';
import Signup from './Signup';

function Header() {
    const [headerVisible, setHeaderVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isSuccess, isError, error } = useSelector(userSelector);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setHeaderVisible(true);
        }

        if (isError) {
            dispatch(clearState());
            setHeaderVisible(false);
            navigate('/login');
        }
    }, [isSuccess, isError]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearState());
        dispatch(clearRestaurantState());
        navigate('/login');
    };

    if (!headerVisible) return <></>;

    return (
        <div className="header">
            <div className="welcome-text">Welcome {user.name}!</div>

            <div className="user-btns">
                <Link to="/restaurants" className="btn btn-no-border">
                    Restaurants
                </Link>
                <a className="btn" onClick={handleLogout}>
                    Logout
                </a>
            </div>
        </div>
    );
}

export default Header;
