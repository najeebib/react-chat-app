import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBJC_pEMNWuFSHdUL9_RZ6aNwUGB2-GgTM",
  authDomain: "chat-app-38f29.firebaseapp.com",
  projectId: "chat-app-38f29",
  storageBucket: "chat-app-38f29.appspot.com",
  messagingSenderId: "807063966563",
  appId: "1:807063966563:web:cd4f19c0af738030293956"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;
