// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLmj29EqcJCv7nU6QraNnKMpbgYoj3IPM",
  authDomain: "fir-usermanagement-ba0a6.firebaseapp.com",
  databaseURL: "https://fir-usermanagement-ba0a6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-usermanagement-ba0a6",
  storageBucket: "fir-usermanagement-ba0a6.firebasestorage.app",
  messagingSenderId: "441396628150",
  appId: "1:441396628150:web:5832ab7b26d93e01d73417"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Export the app instance if needed elsewhere
export default app;