import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isFetching: '',
    isSuccess: '',
    isError: '',
    error: '',
};

export const signup = createAsyncThunk(
    'users/signup',
    async ({ username, password, passwordConfirmation, name }, thunkAPI) => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    password_confirmation: passwordConfirmation,
                    name,
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

export const login = createAsyncThunk(
    'users/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
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

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (thunkAPI) => {
        try {
            const response = await fetch('/api/me', {
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

export const logout = createAsyncThunk('users/logout', async (thunkAPI) => {
    try {
        const response = await fetch('/api/logout', {
            method: 'DELETE',
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
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isFetching = false;
            state.isSuccess = false;
            state.error = '';

            return state;
        },
    },
    extraReducers: {
        [signup.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.username = payload.username;
            state.user = payload;
        },
        [signup.pending]: (state) => {
            state.isFetching = true;
        },
        [signup.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.error = payload.errors[0];
        },
        [login.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.user = payload;
        },
        [login.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.error = payload.errors[0];
        },
        [login.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.user = payload;
        },
        [fetchUser.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [fetchUser.pending]: (state) => {
            state.isFetching = true;
        },
        [logout.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.user = null;
        },
        [logout.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [logout.pending]: (state) => {
            state.isFetching = true;
        },
    },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
