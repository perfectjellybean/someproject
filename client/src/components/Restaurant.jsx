import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Restaurant({ restaurant }) {
    const { id, name } = restaurant;
    const navigate = useNavigate();

    return (
        <div className="restaurant-card">
            <h3>{name}</h3>
            <div className="restaurant-actions">
                <Link to={`/restaurants/${id}`}>Details</Link>
                <Link to={`/restaurants/${id}/history`}>History</Link>
            </div>
        </div>
    );
}

export default Restaurant;
