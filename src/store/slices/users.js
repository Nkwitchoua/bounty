import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
    users: null,
    user: null,
    usersLoading: true,
    userLoading: true,
    usersError: null,
    linksIcons: null,
    linksIconsLoading: true,
    lastDoc: null,
}

const usersSlice = createSlice({
    name: "users",
    initialState: INIT_STATE,
    reducers: {
        usersAreLoading(state) {
            state.usersLoading = true;
        },
        usersSuccess(state, action) {
            state.users = action.payload.users;
            state.lastDoc = action.payload.lastDoc;
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
        },
        usersNextSuccess(state, action) {
            state.lastDoc = action.payload.lastDoc;
            state.users.push(...action.payload.users);
            state.usersLoading = false;
        }
    }
})

export const {
    usersAreLoading, 
    usersSuccess, 
    usersError, 
    userIsLoading, 
    userSuccess, 
    linksIconsAreLoading, 
    linksIconsSuccess, 
    usersNextSuccess, 
    } = usersSlice.actions;

export default usersSlice.reducer;