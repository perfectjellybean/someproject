import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    getRestaurantVisited,
    restaurantSelector,
    clearState as clearRestaurantState,
} from '../features/Restaurant/RestaurantSlice';

function UserOverview() {
    const dispatch = useDispatch();
    const { restaurants } = useSelector(restaurantSelector);

    useEffect(() => {
        dispatch(getRestaurantVisited());
    }, []);

    if (!restaurants) return <h2>Loading</h2>;

    return (
        <div>
            <h3>Recent Visits:</h3>
            {restaurants.map((restaurant) => (
                <div key={restaurant.id}>
                    <Link className="link" to={`/restaurants/${restaurant.id}`}>
                        {restaurant.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default UserOverview;
