// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, onMessage } from "firebase/messaging";
import { getToken } from "firebase/messaging";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjMOrkm1Q5zt6cUA8-c6QOGXV2aWC4-GY",
  authDomain: "gestao-342bc.firebaseapp.com",
  databaseURL: "https://gestao-342bc.firebaseio.com",
  projectId: "gestao-342bc",
  storageBucket: "gestao-342bc.appspot.com",
  messagingSenderId: "1028984371468",
  appId: "1:1028984371468:web:0c89cde297c16dba9bf129",
  measurementId: "G-HBDT2BP7KV"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//export const analytics = getAnalytics(app);
// Initialize Firebase Cloud Messaging and get a reference to the serviceexport 


export const database = getDatabase()

export const auth =  initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})


