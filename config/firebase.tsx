import * as firebase from 'firebase'
import "firebase/auth"
require('firebase/firestore')

passwordReset:email => {
  return firebase.auth().sendPasswordResetEmail(email)
}

const firebaseConfig = {
    apiKey: "AIzaSyDuctSzNCC_LDEzyKOJZXD2eeB3VlLJjLY",
    authDomain: "instagram-clone-4369f.firebaseapp.com",
    databaseURL: "https://instagram-clone-4369f-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-4369f",
    storageBucket: "instagram-clone-4369f.appspot.com",
    messagingSenderId: "884589073231",
    appId: "1:884589073231:web:336d5336f93bbaf3cbeb3a",
    measurementId: "G-2XBEBVB4JP"
  };

  

  firebase.initializeApp(firebaseConfig)

  const db = firebase.firestore();

  export default db;