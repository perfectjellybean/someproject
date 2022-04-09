import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUser,
    login,
    userSelector,
    clearState,
} from '../features/User/UserSlice';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, isSuccess, isError, error } = useSelector(userSelector);

    useEffect(() => {
        dispatch(fetchUser);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            navigate('/');
        }

        if (isError) {
            console.log(error);
            if (error) alert(error);
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login({ username, password }));
    };

    return (
        <div>
            <h1 className="text-center">Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="actions">
                    <button className="submit" type="submit">
                        Login
                    </button>
                    <Link to="/signup">Don't have an account?</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
