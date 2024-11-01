// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWITQ7R0rGTYT-sBMzdtvZcgBXx7KXsso",
  authDomain: "viagens-35a4c.firebaseapp.com",
  projectId: "viagens-35a4c",
  storageBucket: "viagens-35a4c.firebasestorage.app",
  messagingSenderId: "623802898187",
  appId: "1:623802898187:web:f9c63dfd109ca2113a340e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
export const storage = getStorage(app);

  export {db, auth};