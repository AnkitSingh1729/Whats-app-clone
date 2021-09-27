import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA-Xq1FbB-3ZdtlaEVyIAC-yNoK5K7U24M",
    authDomain: "whats-app-clone-bd455.firebaseapp.com",
    projectId: "whats-app-clone-bd455",
    storageBucket: "whats-app-clone-bd455.appspot.com",
    messagingSenderId: "534611777142",
    appId: "1:534611777142:web:6a64c1411ac50166c37157",
    measurementId: "G-SS01FMR6CR"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider }; // it exposes aut and provider from this file. And only explicit import statements can access it
  export default db;  //exposes db, when import statement is not explicitly definig what to import