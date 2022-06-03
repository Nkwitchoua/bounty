import React, {createContext, useContext, useReducer} from 'react'

const INIT_STATE = {
  userDocRef: null
}

const REDUCER = (state, action) => {
  switch(action.type) {
    case "SET_USER_DOC_REF": {
      return {
        ...state,
        userDocRef: action.payload
      }
    }
    default: return state
  }
}

export const userContext = createContext();

const UserContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(REDUCER, INIT_STATE);

  const setUserDocRef = (docRef) => {
    console.log("SETUSERDOCREF WORKS!")
    dispatch({
      type: "SET_USER_DOC_REF",
      payload: docRef
    })
  }

  return (
    <userContext.Provider value={{
      setUserDocRef,
      userDocRef: state.userDocRef
    }}>
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider