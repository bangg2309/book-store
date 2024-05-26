// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, ref, uploadBytes} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATAu5fm1whu0-ue6p3nmw55BbQKZuPjFI",
    authDomain: "book-store-bdec4.firebaseapp.com",
    projectId: "book-store-bdec4",
    storageBucket: "book-store-bdec4.appspot.com",
    messagingSenderId: "508634482814",
    appId: "1:508634482814:web:47673439a5b45c5d1b302f",
    measurementId: "G-Q8DGQLG7SB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
// export const storageRef = ref(storage);
// export const storageRef = storage.ref();