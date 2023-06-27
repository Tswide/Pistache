// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqOnm05VLKe0kysjBU6jmGWVFG5wNmu7w",
  authDomain: "pistaches-23640.firebaseapp.com",
  projectId: "pistaches-23640",
  storageBucket: "pistaches-23640.appspot.com",
  messagingSenderId: "281208507129",
  appId: "1:281208507129:web:84e29629c9018dd206b028"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
