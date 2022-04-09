import React, { useState, useEffect } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, userSelector, clearState } from './features/User/UserSlice';

import './App.css';

import UserOverview from './components/UserOverview';

function App() {
    const dispatch = useDispatch();

    const { username, name, isSuccess } = useSelector(userSelector);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <div className="App">
            <UserOverview />
        </div>
    );
}

export default App;
