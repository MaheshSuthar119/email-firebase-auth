// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV_ePVk00I2ZtqTlyb6A0tCmLRWd5m18o",
  authDomain: "resume-maker-with-firebase.firebaseapp.com",
  projectId: "resume-maker-with-firebase",
  storageBucket: "resume-maker-with-firebase.appspot.com",
  messagingSenderId: "763942294268",
  appId: "1:763942294268:web:699c730eb4e4abe4947d79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db};