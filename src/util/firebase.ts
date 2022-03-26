// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnz3_iswfbpZ7IytHcLtdLYZg6cp4xzl0",
  authDomain: "cherry-blossom-7a823.firebaseapp.com",
  databaseURL: "https://cherry-blossom-7a823-default-rtdb.firebaseio.com",
  projectId: "cherry-blossom-7a823",
  storageBucket: "cherry-blossom-7a823.appspot.com",
  messagingSenderId: "799184670217",
  appId: "1:799184670217:web:f85ab3a88074d8f6f972d8",
  measurementId: "G-4R4V04S7D0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
