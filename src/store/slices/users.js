import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
    users: null,
    user: null,
    usersLoading: true,
    userLoading: true,
    usersError: null,
    linksIcons: null,
    linksIconsLoading: true
}

const usersSlice = createSlice({
    name: "users",
    initialState: INIT_STATE,
    reducers: {
        usersAreLoading(state) {
            state.usersLoading = true;
        },
        usersSuccess(state, action) {
            state.users = action.payload;
            state.usersLoading = false;
        },
        usersError(state, action) {
            state.users = action.payload;
            state.usersLoading = false;
        },
        userIsLoading(state) {
            state.userLoading = true;
        },
        userSuccess(state, action) {
            state.user = action.payload;
            state.userLoading = false;
        },
        linksIconsAreLoading(state) {
            state.linksIconsLoading = true;
        },
        linksIconsSuccess(state, action) {
            state.linksIcons = action.payload;
            state.linksIconsLoading = false;
        }
    }
})

export const {usersAreLoading, usersSuccess, usersError, userIsLoading, userSuccess, linksIconsAreLoading, linksIconsSuccess} = usersSlice.actions;

export default usersSlice.reducer;