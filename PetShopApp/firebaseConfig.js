import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLsbrstEoHn3mRUUcr2jtPh_ksyPGvoUk",
  authDomain: "petshopappbd.firebaseapp.com",
  projectId: "petshopappbd",
  storageBucket: "petshopappbd.firebasestorage.app",
  messagingSenderId: "987521093322",
  appId: "1:987521093322:web:1c6f1ac5ddeb43e72aae33",
  measurementId: "G-QECYWD27H6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);