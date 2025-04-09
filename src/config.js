// firebase.js - place this in your project root or a config directory
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration - replace with your own config
const firebaseConfig = {
  apiKey: "AIzaSyCWfTW-3T_20SpLGHZsJF9mn-Mge8NqoEc",
  authDomain: "first-react-46fe4.firebaseapp.com",
  projectId: "first-react-46fe4",
  storageBucket: "first-react-46fe4.firebasestorage.app",
  messagingSenderId: "1083077010029",
  appId: "1:1083077010029:web:2598ae256d0f7d361e9564",
  measurementId: "G-4RNGT2MXLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;