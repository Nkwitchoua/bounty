import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore'
import { auth, db } from "../../firebaseConfig"
import { currentUserDataSuccess, currentUserSignOut, setCurrentUser, setCurrentUserData, setCurrentUserId } from "../slices/authUser";
import { AddUser } from "./usersActions";


export const signUp = (form) => async (dispatch) => {
    const { email, password } = form;
    await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        dispatch(AddUser(form))
        return "success"
    });
}

export const login = () => {
    
}

export const authUserSignOut = () => async (dispatch) => {
    signOut(auth);
    dispatch(currentUserSignOut());
}

export const setAuthUserData = (email) => async (dispatch) => {
    const usersRef = collection(db, "users");
    const q = await query(usersRef, where("email", "==", email));
    let userData = null;
    await getDocs(q).then((doc) => {
        doc.forEach((user) => {
            userData = user.data();
            dispatch(setCurrentUserId(user.id))
        })
    });
    await dispatch(setCurrentUserData(userData));
    dispatch(currentUserDataSuccess);
}

export const setCurrentUserAction = (user) => async (dispatch) => {
    await dispatch(setCurrentUser(user));
}