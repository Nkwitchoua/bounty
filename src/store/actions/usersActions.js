import { linksIconsSuccess, userIsLoading, usersAreLoading, usersError, usersSuccess, userSuccess } from "../slices/users";
import { getDocs, collection, getDoc, addDoc, doc, updateDoc, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { setNewUserDocRef } from "../slices/authUser";

export const GetUsers = () => async (dispatch) => {
    dispatch(usersAreLoading());
    try {
        const usersList = [];
        const users = await getDocs(query(collection(db, "users"), limit(10)));
        
        await users.docs
        .forEach(user => {
                usersList.push({
                    ...user.data(),
                    id: user.id
                })
            })
        const lastDoc = await users.docs[users.docs.length - 1].id;
        dispatch(usersSuccess({ users: usersList, lastDoc }))
    } catch(error) {
        dispatch(usersError(error))
    }
}

export const SearchUsers = (search, searchType) => async (dispatch) => {
    dispatch(usersAreLoading());
    let searchSet = []
    if(searchType == "projects") {
        searchSet.push("jobs", "type_of_job");
    } else {
        searchSet.push("users", "career");
    }
    try {
        const usersList = [];
        const users = await getDocs(query(db, searchSet[0]), limit(10), where(searchSet[1], "==", search));
        console.log(users);
        users.docs.forEach((user) => {
            console.log(user);
            usersList.push({
                ...user.data(),
                id: user.id
            })
        })
        console.log(usersList);
        const lastDoc = await users.docs[users.docs.length - 1];
        dispatch(usersSuccess({users: usersList, lastDoc}));
    } catch(error) {
        dispatch(usersError(error))
    }
}

export const GetUsersNext = (lastDoc) => async (dispatch) => {
    dispatch(usersAreLoading());
    try {
        const usersList = [];
        const users = await getDocs(query(
            collection(db, "users"),
            limit(10),
            startAfter(lastDoc)
        ))
        users.forEach(user => {
            usersList.push({
                ...user.data(),
                id: user.id
            })
        })
    } catch(err) {
        dispatch(usersError(err.message))
    }
}

export const AddUser = (user) => async (dispatch) => {
    const userData = {
        ...user,
        followers: 0,
        following: 0,
        experience: "",
        career: "",
        links: [],
        photo: ""
    }
    const docRef = await addDoc(collection(db, "users"), userData);
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

export const GetUser = (id) => async(dispatch) => {
    dispatch(userIsLoading());
    const user = await getDoc(doc(db, "users", `${id}`));
    dispatch(userSuccess({
        id: user.id,
        ...user.data()
    }));
}

export const GetLinksIcons = (links) => async(dispatch) => {
    if(!links) {
        dispatch(linksIconsSuccess(null));
        return;
    }
    const pattern = /[a-z]{1,}(?=\.[a-z]{2,3}\/)/gi;
    let newLinksList = [];
    links.forEach((link) => {
        let newLink = link.match(pattern);
        newLinksList.push(newLink[0]);
    });
    dispatch(linksIconsSuccess(newLinksList));
}

export const UpdateUser = (userId, userData) => async (dispatch) => {
    await updateDoc(doc(db, "users", `${userId}`), userData)
    .then(() => {
        dispatch(GetUser(userId));
    });
}