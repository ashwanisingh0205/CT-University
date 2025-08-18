// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGEba4dkaa_m77Xqu4EmpCU73s_f2bDG4",
  authDomain: "bar-management-283d3.firebaseapp.com",
  databaseURL: "https://bar-management-283d3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bar-management-283d3",
  storageBucket: "bar-management-283d3.firebasestorage.app",
  messagingSenderId: "663999656634",
  appId: "1:663999656634:web:8168c8f85972321f978883"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const database = getDatabase(app);

export default app;
