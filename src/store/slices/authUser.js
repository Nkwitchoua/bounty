import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
    currentUser: null,
    newUserDocRef: null,
    currentUserData: null,
    currentUserId: null,
    currentUserDataLoading: true
}

const authUserSlice = createSlice({
    name: "authUser",
    initialState: INIT_STATE,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setNewUserDocRef(state, action) {
            state.newUserDocRef = action.payload;
        },
        setCurrentUserData(state, action) {
            state.currentUserData = action.payload;
        },
        currentUserSignOut(state) {
            state.currentUser = null;
        },
        setCurrentUserId(state, action) {
            state.currentUserId = action.payload;
        },
        currentUserDataSuccess(state) {
            state.currentUserDataLoading = false;
        },
        currentUserDataPending(state) {
            state.currentUserDataLoading = true;
        }
    }
});

export const { setCurrentUser, setNewUserDocRef, setCurrentUserData, currentUserSignOut, setCurrentUserId, currentUserDataPending, currentUserDataSuccess } = authUserSlice.actions;

export default authUserSlice.reducer;