// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWMON-ZCRWuNsucBGZJHDN4LIcCgECJgI",
  authDomain: "my-todos-d5b0b.firebaseapp.com",
  projectId: "my-todos-d5b0b",
  storageBucket: "my-todos-d5b0b.firebasestorage.app",
  messagingSenderId: "53185800829",
  appId: "1:53185800829:web:9aab4c0360b67344c99f14",
  databaseURL: "https://my-todos-d5b0b-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
