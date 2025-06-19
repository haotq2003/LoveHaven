// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lovehavenstop.firebaseapp.com",
  projectId: "lovehavenstop",
  storageBucket: "lovehavenstop.firebasestorage.app",
  messagingSenderId: "628043338055",
  appId: "1:628043338055:web:b7e5c59c6541c515c6bc62",
  measurementId: "G-VHG5Y1ZQJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();