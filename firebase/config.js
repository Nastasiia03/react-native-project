import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqYX3pnFfSytWE_FlXQjouwbOlFHVkl3Q",
  authDomain: "react-native-project-24af8.firebaseapp.com",
  projectId: "react-native-project-24af8",
  storageBucket: "react-native-project-24af8.appspot.com",
  messagingSenderId: "905251541582",
  appId: "1:905251541582:web:4385a9b1f2766760aae91f",
  measurementId: "G-D6BRYVDW1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);