import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
    currentUser: null,
    newUserDocRef: null,
}

const authUserSlice = createSlice({
    name: "authUser",
    initialState: INIT_STATE,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setNewUserDocRef(state, action) {
            console.log("WORKS", action.payload)
            state.newUserDocRef = action.payload;
        }
    }
});

export const { setCurrentUser, setNewUserDocRef } = authUserSlice.actions;

export default authUserSlice.reducer;