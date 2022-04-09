import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './features/User/UserSlice';
import { restaurantSlice } from './features/Restaurant/RestaurantSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        restaurant: restaurantSlice.reducer,
    },
});

export default store;
