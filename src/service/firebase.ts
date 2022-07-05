import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnz3_iswfbpZ7IytHcLtdLYZg6cp4xzl0",
  authDomain: "cherry-blossom-7a823.firebaseapp.com",
  databaseURL: "https://cherry-blossom-7a823-default-rtdb.firebaseio.com",
  projectId: "cherry-blossom-7a823",
  storageBucket: "cherry-blossom-7a823.appspot.com",
  messagingSenderId: "799184670217",
  appId: "1:799184670217:web:f85ab3a88074d8f6f972d8",
  measurementId: "G-4R4V04S7D0"
}

firebase.initializeApp(firebaseConfig);
export default firebase;
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const db = getFirestore(app);
export const firestore = firebase.firestore();
