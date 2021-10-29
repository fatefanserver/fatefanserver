import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize the app with a custom auth variable, limiting the server's access
if (!firebase.apps.length) {
  
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({experimentalForceLongPolling: true});
}

export default firebase;
