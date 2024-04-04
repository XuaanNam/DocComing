// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC6N7t4a8VEHL2pC42nM5ygy5kDa-1DFU",
  authDomain: "doctor-coming.firebaseapp.com",
  projectId: "doctor-coming",
  storageBucket: "doctor-coming.appspot.com",
  messagingSenderId: "675491223663",
  appId: "1:675491223663:web:a11e21f9b5c22482a8559a",
  measurementId: "G-1CY3NH4PHQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);