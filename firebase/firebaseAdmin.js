import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const clientCredentials = {
  apiKey: "AIzaSyALagzkKALAxfFGcEEH4B68B3PWxmmAHak",
  authDomain: "grape-7be33.firebaseapp.com",
  projectId: "grape-7be33",
  storageBucket: "grape-7be33.appspot.com",
  messagingSenderId: "1014989130765",
  appId: "1:1014989130765:web:8b0ccd66c94c3151f81944"
};

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
  }
  
  export default firebase;