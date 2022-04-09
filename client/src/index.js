import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

import App from './App';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Restaurants from './components/Restaurants';
import RestaurantCreate from './components/RestaurantCreate';
import RestaurantDetails from './components/RestaurantDetails';
import RestaurantHistory from './components/RestaurantHistory';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route
                    path="/restaurants/create"
                    element={<RestaurantCreate />}
                />
                <Route
                    path="/restaurants/:id"
                    element={<RestaurantDetails />}
                />
                <Route
                    path="/restaurants/:id/history"
                    element={<RestaurantHistory />}
                />
            </Routes>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
