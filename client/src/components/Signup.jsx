import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    fetchUser,
    userSelector,
    signup,
    clearState,
} from '../features/User/UserSlice';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFetching, isSuccess, isError, error } = useSelector(userSelector);

    useEffect(() => {
        dispatch(fetchUser);
    }, []);

    useEffect(() => {
        console.log('isSuccess', isSuccess);
        if (isError) {
            console.log(error);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState());
            navigate('/');
        }
    }, [isSuccess, isError]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            passwordConfirmation,
            name,
        };
        console.log(newUser);

        dispatch(signup(newUser));
    };

    return (
        <div>
            <h1 className="text-center">Sign up</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="confirm password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <div className="actions">
                    <button className="submit" type="submit">
                        Signup
                    </button>
                    <Link to="/login">Already have an account?</Link>
                </div>
            </form>
        </div>
    );
}

export default Signup;
