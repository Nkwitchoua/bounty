// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHimZH2Y3M-rDjxecd7gY5XWWa-7MVxDw",
  authDomain: "bounty-51eac.firebaseapp.com",
  projectId: "bounty-51eac",
  storageBucket: "bounty-51eac.appspot.com",
  messagingSenderId: "97096626485",
  appId: "1:97096626485:web:6bedb8279e23922b1a5c7c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);