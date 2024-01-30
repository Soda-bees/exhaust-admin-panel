import { createSlice } from '@reduxjs/toolkit';

export const authToken = createSlice({
    name: 'auth',
    initialState: {
        authToken: null,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
        clearAuthToken: (state) => {
            state.authToken = null;
        },
    },
});

export const { setAuthToken, clearAuthToken } = authToken.actions;

export const selectAuthToken = (state) => state.authToken.authToken;

export default authToken.reducer;
