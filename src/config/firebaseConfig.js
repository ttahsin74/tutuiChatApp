// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrBHvoh0lemv5upD7jUmI6--SuOwOzwpk",
  authDomain: "tutuichat.firebaseapp.com",
  projectId: "tutuichat",
  storageBucket: "tutuichat.appspot.com",
  messagingSenderId: "879874065453",
  appId: "1:879874065453:web:cb15d4583a618c4ff964a4",
  measurementId: "G-1LJE1DWCHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default firebaseConfig