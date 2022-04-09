import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    getRestaurantRecords,
    restaurantSelector,
    clearState as clearRestaurantState,
} from '../features/Restaurant/RestaurantSlice';

function RestaurantHistory() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { records } = useSelector(restaurantSelector);

    useEffect(() => {
        dispatch(getRestaurantRecords({ restaurantId: id }));
    }, []);

    if (!records) return <h2>Loading</h2>;

    return (
        <div>
            {records.length > 0 ? (
                records.map((day) => (
                    <div key={day[0]}>
                        <h3>{day[0]}</h3>
                        <ol>
                            {day[1].map((record) => (
                                <li key={record.id}>
                                    {record.user.name} -{' '}
                                    {new Date(
                                        record.created_at
                                    ).toLocaleTimeString()}
                                </li>
                            ))}
                        </ol>
                    </div>
                ))
            ) : (
                <div>No visitors</div>
            )}
        </div>
    );
}

export default RestaurantHistory;
