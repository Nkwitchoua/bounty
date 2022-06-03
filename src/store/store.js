import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import usersReducer from "./slices/users";
import authUserReducer from "./slices/authUser"
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    users: usersReducer,
    authUser: authUserReducer
});

export const store = configureStore({
    reducer: rootReducer
}, applyMiddleware(thunk));