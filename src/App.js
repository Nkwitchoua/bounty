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
import { setCurrentUserAction } from './store/actions/authUserActions';
import UserContextProvider from './contexts/userContext';

function App() {

  // const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      // setCurrentUser(user);
      if (user){
        dispatch(setCurrentUserAction(user.email));
      }else{
        dispatch(setCurrentUserAction(null));
      }
    })
  }, [])

  return (
    // <Provider store={store}>
      <BrowserRouter>
        <UserContextProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/profiles' element={<Profiles/>} />
            <Route path='/jobs' element={<Jobs/>} />
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
        </UserContextProvider>
      </BrowserRouter>
    // </Provider>
  );
}

export default App;
