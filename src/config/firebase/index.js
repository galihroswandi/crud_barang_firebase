// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfO7veYLWHlD6ws0Zy0DIdm2sqcDcgKiA",
  authDomain: "crud-reactjs-dd70f.firebaseapp.com",
  databaseURL: "https://crud-reactjs-dd70f-default-rtdb.firebaseio.com",
  projectId: "crud-reactjs-dd70f",
  storageBucket: "crud-reactjs-dd70f.appspot.com",
  messagingSenderId: "483976809227",
  appId: "1:483976809227:web:1db685b49e929005f8b00e"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const database = getDatabase();
export const storage = getStorage(firebase);

export default firebase;