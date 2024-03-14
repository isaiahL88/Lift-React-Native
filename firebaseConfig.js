import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBesdySxancpTLUjREp8M15PTxNw4X-nFc",
    authDomain: "lift-79a8b.firebaseapp.com",
    projectId: "lift-79a8b",
    storageBucket: "lift-79a8b.appspot.com",
    messagingSenderId: "23732262998",
    appId: "1:23732262998:web:4afb1f5228d3df255a83f7",
    measurementId: "G-BPX8N6J76W"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
