// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBesdySxancpTLUjREp8M15PTxNw4X-nFc",
    authDomain: "lift-79a8b.firebaseapp.com",
    projectId: "lift-79a8b",
    storageBucket: "lift-79a8b.appspot.com",
    messagingSenderId: "23732262998",
    appId: "1:23732262998:web:4afb1f5228d3df255a83f7",
    measurementId: "G-BPX8N6J76W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);