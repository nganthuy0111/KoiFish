// config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBI-zVd5HyZFe1VuV68-dBAgTEkatWTLM",
  authDomain: "koitour-bf099.firebaseapp.com",
  projectId: "koitour-bf099",
  storageBucket: "koitour-bf099.appspot.com",
  messagingSenderId: "999352991244",
  appId: "1:999352991244:web:8418a2306159b1ea567829",
  measurementId: "G-9WFGXK5PG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { storage, googleProvider, auth, app, analytics };
