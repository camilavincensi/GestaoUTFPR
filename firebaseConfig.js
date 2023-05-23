// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmP3qKQNa0NoQJOHDMxTq34Tqchr4kL5Q",
  authDomain: "gestaoutfpr-d3cfb.firebaseapp.com",
  databaseURL: "https://gestaoutfpr-d3cfb-default-rtdb.firebaseio.com",
  projectId: "gestaoutfpr-d3cfb",
  storageBucket: "gestaoutfpr-d3cfb.appspot.com",
  messagingSenderId: "723270475241",
  appId: "1:723270475241:web:19bba54b850d2760efff78",
  measurementId: "G-J2MB76RE7H"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;