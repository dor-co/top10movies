import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBIKxSA4ofOGxMNn4Eh6oSwCyT0z8PYIlg",
    authDomain: "top10movies-c3c84.firebaseapp.com",
    projectId: "top10movies-c3c84",
    storageBucket: "top10movies-c3c84.appspot.com",
    messagingSenderId: "330323595306",
    appId: "1:330323595306:web:18489e892e8718aeee7353",
    measurementId: "G-XDCSRT9HW3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default db;
