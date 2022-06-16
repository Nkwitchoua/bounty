import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Profiles from './pages/Profiles';
import Jobs from './pages/Jobs';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from "react-toastify"
import { auth } from "./firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from 'react';
import { setAuthUserData, setCurrentUserAction } from './store/actions/authUserActions';
import UserContextProvider from './contexts/userContext';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import SearchPage from './pages/SearchPage';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user){
        dispatch(setCurrentUserAction(user.email));
        dispatch(setAuthUserData(user.email));
      }else{
        dispatch(setCurrentUserAction(null));
      }
    })
  }, [])

  return (
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/profiles' element={<Profiles/>} />
            <Route path='/jobs' element={<Jobs/>} />
            <Route path='/profiles/:userId' element={<Profile/>} />
            <Route path='/edit-profile/:userId' element={<EditProfile/>} />
            <Route path='/search' element={<SearchPage/>} />
          </Routes>
        <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
      </BrowserRouter>
  );
}

export default App;
