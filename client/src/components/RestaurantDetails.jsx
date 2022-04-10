import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    getRestaurant,
    createRestaurantRecord,
    restaurantSelector,
    clearState as clearRestaurantState,
} from '../features/Restaurant/RestaurantSlice';

import { userSelector } from '../features/User/UserSlice';

import QRCode from 'react-qr-code';

import Header from './Header';

function RestaurantDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loc = useLocation();

    const { restaurant } = useSelector(restaurantSelector);
    const { user } = useSelector(userSelector);
    const restaurantUrl = window.location.origin + '#' + loc.pathname;

    useEffect(() => {
        dispatch(getRestaurant({ restaurantId: id }));
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(createRestaurantRecord({ userId: user.id, restaurantId: id }));
        navigate('/');
    };

    if (!restaurant) return <h2>Loading ...</h2>;

    return (
        <div>
            <div className="restaurant-details">
                <h1>{restaurant.name}</h1>
                <QRCode value={restaurantUrl} />

                <button onClick={handleClick}>Check in</button>
            </div>
        </div>
    );
}

export default RestaurantDetails;
