import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyFflDKb1UUhfVGHOAiPyPg_q-Wup6iRQ",
    authDomain: "backforcourseweb.firebaseapp.com",
    databaseURL: "https://backforcourseweb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "backforcourseweb",
    storageBucket: "backforcourseweb.appspot.com",
    messagingSenderId: "925556395917",
    appId: "1:925556395917:web:72a3a71f4f8c28712137c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app) //DataBase

export { app, auth, db };