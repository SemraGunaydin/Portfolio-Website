import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyBJeMcx4rvb-evI5dD3GNkMmzyVB7Sv7eY",
  authDomain: "react-portfolio-dashboar-b5544.firebaseapp.com",
  projectId: "react-portfolio-dashboar-b5544",
  storageBucket: "react-portfolio-dashboar-b5544.firebasestorage.app",
  messagingSenderId: "1023787384938",
  appId: "1:1023787384938:web:8cfedb95bd8409a34dca13",
  measurementId: "G-D3X0TY3FCK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db =getFirestore(app);
export const storage = getStorage(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
