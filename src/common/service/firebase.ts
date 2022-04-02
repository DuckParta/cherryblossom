import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebase from "firebase-admin";
import { getFirestore } from "firebase/firestore";
// import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnz3_iswfbpZ7IytHcLtdLYZg6cp4xzl0",
  authDomain: "cherry-blossom-7a823.firebaseapp.com",
  databaseURL: "https://cherry-blossom-7a823-default-rtdb.firebaseio.com",
  projectId: "cherry-blossom-7a823",
};

firebase.initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = firebase.firestore();
export const db = getFirestore();

// const firebaseConfig = {
//   apiKey: "AIzaSyBZkuE-LS62VHJkFZ4Fh5nV3EhJEPkl5yQ",
//   authDomain: "cherry-blossom-345004.firebaseapp.com",
//   databaseURL: "https://cherry-blossom-345004-default-rtdb.firebaseio.com/",
//   projectId: "cherry-blossom-345004",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const database = getDatabase(app);
