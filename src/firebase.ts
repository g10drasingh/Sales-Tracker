// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import auth functions

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsK7juW4ETBMD3heOuAZhYQEKNDc653-A",
  authDomain: "sales-trackergit-3774203-2e4c8.firebaseapp.com",
  projectId: "sales-trackergit-3774203-2e4c8",
  storageBucket: "sales-trackergit-3774203-2e4c8.appspot.com",
  messagingSenderId: "220335735938",
  appId: "1:220335735938:web:97d7046a9265e7cdb2209b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Initialize auth

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export { app, database, auth, signInWithGoogle }; // Export auth and signInWithGoogle
