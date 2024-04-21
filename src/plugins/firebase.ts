// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLCzVYHXD2Db2Dp7ZnRj6gnMda-Ou6fGM",
  authDomain: "faustinicostruzioni-b5930.firebaseapp.com",
  projectId: "faustinicostruzioni-b5930",
  storageBucket: "faustinicostruzioni-b5930.appspot.com",
  messagingSenderId: "410345993061",
  appId: "1:410345993061:web:18102806084da64671e78c",
  measurementId: "G-KKM0YT53CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
