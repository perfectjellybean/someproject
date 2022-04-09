import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUser,
    userSelector,
    clearState,
} from '../features/User/UserSlice';

import {
    getUserRestaurants,
    restaurantSelector,
    clearState as clearRestaurantState,
} from '../features/Restaurant/RestaurantSlice';

import Header from './Header';
import Restaurant from './Restaurant';

function Restaurants() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(userSelector);
    const { restaurants } = useSelector(restaurantSelector);

    useEffect(() => {
        dispatch(getUserRestaurants());
    }, []);

    if (!restaurants) return <h2>Loading ...</h2>;

    return (
        <div>
            {/* <Header /> */}
            <div className="margin-around">
                <Link to="/restaurants/create" className="primary-btn">
                    Create Restaurant
                </Link>
            </div>
            <div className="restaurants">
                {restaurants ? (
                    restaurants.map((restaurant) => (
                        <Restaurant
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))
                ) : (
                    <div>You have no restaurants</div>
                )}
            </div>
        </div>
    );
}

export default Restaurants;
