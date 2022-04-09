import React, { useState, useEffect } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUser,
    userSelector,
    clearState,
} from '../features/User/UserSlice';
import {
    createRestaurant,
    restaurantSelector,
    clearState as clearRestaurantState,
} from '../features/Restaurant/RestaurantSlice';

function RestaurantCreate() {
    const [restaurantName, setRestaurantName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isSuccess, isError, error } = useSelector(userSelector);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRestaurant({ restaurantName, userId: user.id }));
        dispatch(clearRestaurantState());
        navigate('/restaurants');
    };

    return (
        <div>
            <h1 className="text-center">Create Restaurant</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    onChange={(e) => setRestaurantName(e.target.value)}
                />
                <div className="actions">
                    <button className="submit" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RestaurantCreate;
