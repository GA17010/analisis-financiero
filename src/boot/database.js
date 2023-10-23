// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGMP7sTJ_isxPhTHJzwUEEc37fjMNNcd8",
  authDomain: "analisis-financiero-60e3f.firebaseapp.com",
  projectId: "analisis-financiero-60e3f",
  storageBucket: "analisis-financiero-60e3f.appspot.com",
  messagingSenderId: "14529971175",
  appId: "1:14529971175:web:27cc928c6e8c0494e6b342"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
