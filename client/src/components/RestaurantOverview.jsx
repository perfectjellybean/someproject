import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getRestaurantVisited,
    restaurantSelector,
    clearState as clearRestaurantState,
} from '../features/Restaurant/RestaurantSlice';

function RestaurantOverview() {
    const dispatch = useDispatch();
    const { restaurants } = useSelector(restaurantSelector);

    useEffect(() => {
        dispatch(getRestaurantVisited());
    }, []);

    if (!restaurants) return <h2>Loading</h2>;

    return <div></div>;
}

export default RestaurantOverview;
