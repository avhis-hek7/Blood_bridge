import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmw3X5PBbQsstkb3zlFItKNiIOKzPEsJQ",
  authDomain: "blood-bridge-10d1a.firebaseapp.com",
  projectId: "blood-bridge-10d1a",
  storageBucket: "blood-bridge-10d1a.firebasestorage.app",
  messagingSenderId: "353648036221",
  appId: "1:353648036221:web:af66995c203d16dec52414",
  measurementId: "G-NZW5X7NXKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, signInWithPopup, provider };
