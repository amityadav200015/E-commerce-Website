// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDvrfsyPNaRazfjN2bveHXCvZJdwKS_BOo",
  authDomain: "challenge-8bd2b.firebaseapp.com",
  projectId: "challenge-8bd2b",
  storageBucket: "challenge-8bd2b.appspot.com",
  messagingSenderId: "547916199977",
  appId: "1:547916199977:web:34eaff369c9351b3f88438",
  measurementId: "G-PDV7103CVL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };