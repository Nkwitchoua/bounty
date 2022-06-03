import { usersAreLoading, usersError, usersSuccess } from "../slices/users";
import { getDocs, collection, getDoc, addDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { setNewUserDocRef } from "../slices/authUser"
import { useContext } from "react";
import { userContext } from "../../contexts/userContext";

export const GetUsers = () => async (dispatch) => {
    dispatch(usersAreLoading);
    try {
        const usersList = [];
        const users = await getDocs(collection(db, "users"));
        await users.docs
            .forEach(user => {
                usersList.push({
                    ...user.data(),
                    id: user.id
                })
            })
        dispatch(usersSuccess(usersList))
    } catch(error) {
        dispatch(usersError(error))
    }
}

export const AddUser = (user) => async (dispatch) => {
    console.log(user)
    const docRef = await addDoc(collection(db, "users"), user);
    toast.success("You successfully registered!", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
    setNewUserDocRef(docRef);
    dispatch(usersSuccess([]));
    console.log("reached setUserDocRef")
}
