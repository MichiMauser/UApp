// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDpiUVWjvAL5ETnpR7a6Yv7fooMFkqK_SY",
  authDomain: "uapp-e77f2.firebaseapp.com",
  projectId: "uapp-e77f2",
  storageBucket: "uapp-e77f2.firebasestorage.app",
  messagingSenderId: "295260109094",
  appId: "1:295260109094:web:cfdb1d36981d0a032ba9e7",
  measurementId: "G-SBWW7J1P7J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)