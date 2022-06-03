import { createUserWithEmailAndPassword } from "firebase/auth"
import {addDoc, collection} from 'firebase/firestore'
import { auth, db } from "../../firebaseConfig"
import { setCurrentUser } from "../slices/authUser";
import { AddUser } from "./usersActions";


export const signUp = (form) => async (dispatch) => {
    const { email, password} = form;
    await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        dispatch(AddUser(form))
        return "success"
    });
}

export const login = () => {
    
}

export const setCurrentUserAction = (user) => async (dispatch) => {
    await dispatch(setCurrentUser(user));
}