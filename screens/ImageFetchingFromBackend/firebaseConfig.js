import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB8dSqgs2-y1FA7DlUK750RWICN7F6sm2I",
  authDomain: "pipu-af72a.firebaseapp.com",
  projectId: "pipu-af72a",
  storageBucket: "pipu-af72a.appspot.com",
  messagingSenderId: "846193689454",
  appId: "1:846193689454:web:0c9e2fd458767aaf69777f",
  measurementId: "G-2309FGW4H6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth()

export { db, storage,auth};
export default firebase;