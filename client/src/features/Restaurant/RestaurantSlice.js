import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    restaurants: [],
    records: [],
    restaurant: '',
    isFetching: '',
    isSuccess: '',
    isError: '',
    error: '',
};

export const createRestaurant = createAsyncThunk(
    'restaurants/create',
    async ({ restaurantName, userId }, thunkAPI) => {
        try {
            const response = await fetch('/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: restaurantName,
                    user_id: userId,
                }),
            });

            let data = await response.json();

            if (response.status === 201) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getUserRestaurants = createAsyncThunk(
    'restaurants/getUserRestaurants',
    async (thunkAPI) => {
        try {
            const response = await fetch(`/api/restaurant_owners/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let data = await response.json();

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getRestaurant = createAsyncThunk(
    'restaurants/getRestaurant',
    async ({ restaurantId }, thunkAPI) => {
        try {
            const response = await fetch(`/api/restaurants/${restaurantId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let data = await response.json();

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getRestaurantRecords = createAsyncThunk(
    'restaurants/getRestaurantRecords',
    async ({ restaurantId }, thunkAPI) => {
        try {
            const response = await fetch(
                `/api/restaurant_records/${restaurantId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            let data = await response.json();

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const createRestaurantRecord = createAsyncThunk(
    'restaurants/createRestaurantRecord',
    async ({ userId, restaurantId }, thunkAPI) => {
        try {
            const response = await fetch(`/api/restaurant_records/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    restaurant_id: restaurantId,
                }),
            });

            let data = await response.json();

            if (response.status === 201) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getRestaurantVisited = createAsyncThunk(
    'restaurants/getRestaurantVisited',
    async (thunkAPI) => {
        try {
            const response = await fetch(`/api/visit`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let data = await response.json();

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getRestaurantRecordsPastDay = createAsyncThunk(
    'restaurants/getRestaurantRecordsPastDay',
    async (thunkAPI) => {
        try {
            const response = await fetch(`/api/visit/day`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let data = await response.json();

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isFetching = false;
            state.isSuccess = false;
            state.error = '';
            state.restaurants = [];
            state.restaurant = null;
            state.records = [];

            return state;
        },
    },
    extraReducers: {
        [createRestaurant.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.restaurant = payload;
        },
        [createRestaurant.pending]: (state) => {
            state.isFetching = true;
        },
        [createRestaurant.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.error = payload.errors[0];
        },
        [getUserRestaurants.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.restaurants = payload;
        },
        [getUserRestaurants.pending]: (state) => {
            state.isFetching = true;
        },
        [getUserRestaurants.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            console.log(payload);
            state.error = payload.error;
        },
        [getRestaurant.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.restaurant = payload;
        },
        [getRestaurant.pending]: (state) => {
            state.isFetching = true;
        },
        [getRestaurant.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.error = payload.errors[0];
        },
        [getRestaurantRecords.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.records = payload;
        },
        [getRestaurantRecords.pending]: (state) => {
            state.isFetching = true;
        },
        [getRestaurantRecords.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.error = payload.errors[0];
        },
        [createRestaurantRecord.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
        },
        [createRestaurantRecord.pending]: (state) => {
            state.isFetching = true;
        },
        [createRestaurantRecord.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.error = payload.errors[0];
        },
        [getRestaurantVisited.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.restaurants = payload;
        },
        [getRestaurantVisited.pending]: (state) => {
            state.isFetching = true;
        },
        [getRestaurantVisited.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.error = payload.errors[0];
        },
        [getRestaurantRecordsPastDay.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.records = payload;
        },
        [getRestaurantRecordsPastDay.pending]: (state) => {
            state.isFetching = true;
        },
        [getRestaurantRecordsPastDay.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.error = payload.errors[0];
        },
    },
});

export const { clearState } = restaurantSlice.actions;

export const restaurantSelector = (state) => state.restaurant;
