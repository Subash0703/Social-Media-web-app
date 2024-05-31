// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6e76W_lek1YBMM1cz6bpEVROQQg6xAH0",
  authDomain: "starchat-in.firebaseapp.com",
  projectId: "starchat-in",
  storageBucket: "starchat-in.appspot.com",
  messagingSenderId: "858752899387",
  appId: "1:858752899387:web:c8def047bf663f7a693f1e",
  measurementId: "G-ZRL9GFSHQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const storage =  getStorage(app);
export const db = getFirestore(app);