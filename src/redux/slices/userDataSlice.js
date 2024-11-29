import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuth: false,
    userId: null
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isAuth = action.payload.isAuth;
            state.userId = action.payload.userId;
        },
        logOut: (state) => {
            state.isAuth = false;
            state.userId = null;
        },
    }
});
export const { logIn, logOut } = userDataSlice.actions;

export default userDataSlice.reducer;