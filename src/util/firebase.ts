import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDnz3_iswfbpZ7IytHcLtdLYZg6cp4xzl0",
  authDomain: "cherry-blossom-7a823.firebaseapp.com",
  databaseURL: "https://cherry-blossom-7a823-default-rtdb.firebaseio.com",
  projectId: "cherry-blossom-7a823",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
